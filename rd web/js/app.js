/**
 * CARS24 MASTER APPLICATION SCRIPT
 * Coordinates catalog filtering, modals, compare dock, auth UI, and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  checkMandatoryAuth();
  initNavbarAuth();
  initCompareDock();
  initWishlistCounters();
  
  // Page-specific initializers based on current file/elements
  if (document.getElementById('cars-grid-container')) {
    initCatalogPage();
  }
  if (document.getElementById('new-cars-grid-container')) {
    initNewCarsPage();
  }
  if (document.getElementById('compare-matrix-container')) {
    initComparePage();
  }
  if (document.getElementById('emi-calculator-view')) {
    initEmiCalculatorPage();
  }
  if (document.getElementById('sell-car-wizard')) {
    initSellCarPage();
  }
  if (document.getElementById('admin-dashboard-view')) {
    initAdminPage();
  }

  // Global listeners
  window.addEventListener('authStateChanged', () => {
    checkMandatoryAuth();
    initNavbarAuth();
    if (document.getElementById('admin-dashboard-view')) {
      initAdminPage();
    }
  });

  window.addEventListener('compareUpdated', () => {
    initCompareDock();
    if (document.getElementById('compare-matrix-container')) {
      renderComparePage();
    }
    syncCardCompareCheckboxes();
  });

  window.addEventListener('wishlistUpdated', () => {
    initWishlistCounters();
    syncCardWishlistHearts();
  });
}

/* ==========================================================================
   NAVBAR & AUTHENTICATION UI
   ========================================================================== */
function initNavbarAuth() {
  const user = window.authDB.getCurrentUser();
  const authContainer = document.getElementById('navbar-auth-actions');
  if (!authContainer) return;

  if (user) {
    const isAdm = user.role === 'admin';
    authContainer.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <div class="user-menu-wrapper">
          <button class="user-profile-btn" id="user-profile-toggle" onclick="toggleUserDropdown(event)">
            <div class="user-avatar ${isAdm ? 'admin-avatar' : ''}">
              ${user.name.charAt(0).toUpperCase()}
            </div>
            <span class="user-name-label">${user.name.split(' ')[0]}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div class="user-dropdown" id="user-dropdown-menu">
            <div class="user-dropdown-header">
              <div class="dropdown-user-name">${user.name}</div>
              <div class="dropdown-user-role">${user.role === 'admin' ? '🛡️ Administrator' : 'Verified Buyer'}</div>
            </div>
            <ul class="user-dropdown-links">
              ${isAdm ? `<li><a href="admin.php"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> Admin Dashboard</a></li>` : ''}
              <li><a href="javascript:void(0)" onclick="openWishlistModal()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg> My Wishlist (<span class="auth-wishlist-count">0</span>)</a></li>
              <li><a href="javascript:void(0)" onclick="openMyBookingsModal()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> My Test Drives</a></li>
              <li><a href="javascript:void(0)" onclick="openMyNewOrdersModal()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg> My New Car Orders</a></li>
              <li><button class="logout-btn" onclick="handleLogout()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg> Sign Out</button></li>
            </ul>
          </div>
        </div>
        <button class="btn-signout-nav" onclick="handleLogout()" title="Sign Out and Lock Portal">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          <span>Sign Out</span>
        </button>
      </div>
    `;
  } else {
    authContainer.innerHTML = `
      <button class="btn-outline" onclick="openAuthModal('login')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        Sign In
      </button>
      <button class="btn-primary" onclick="openAuthModal('register')">Register</button>
    `;
  }

  // Update admin nav link visibility
  const adminNavLink = document.getElementById('nav-admin-link');
  if (adminNavLink) {
    if (user && user.role === 'admin') {
      adminNavLink.style.display = 'inline-flex';
    } else {
      adminNavLink.style.display = 'none';
    }
  }

  initWishlistCounters();
}

function toggleUserDropdown(e) {
  e.stopPropagation();
  const dropdown = document.getElementById('user-dropdown-menu');
  if (dropdown) dropdown.classList.toggle('show');
}

document.addEventListener('click', () => {
  const dropdown = document.getElementById('user-dropdown-menu');
  if (dropdown) dropdown.classList.remove('show');
});

function handleLogout() {
  const wasAdminPage = window.location.pathname.includes('admin.php') || window.location.pathname.includes('admin-login.php') || window.location.pathname.includes('admin.html') || window.location.pathname.includes('admin-login.html');
  window.authDB.logout();
  if (wasAdminPage) {
    document.documentElement.classList.remove('c24-auth-locked');
    window.showToast("Admin session ended. Signed out successfully.", "info");
    setTimeout(() => {
      window.location.href = 'admin-login.php';
    }, 400);
  } else {
    document.documentElement.classList.add('c24-auth-locked');
    window.showToast("Signed out. Please sign in or register to access CARS24.", "info");
    checkMandatoryAuth();
  }
}

/* ==========================================================================
   AUTH MODAL & DEMO FILLER
   ========================================================================== */
function openAuthModal(mode = 'login') {
  let modal = document.getElementById('auth-modal');
  if (!modal) {
    createAuthModalDOM();
    modal = document.getElementById('auth-modal');
  }
  switchAuthTab(mode);
  modal.classList.add('active');
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.classList.remove('active');
}

function switchAuthTab(tab) {
  const loginTab = document.getElementById('auth-tab-login');
  const regTab = document.getElementById('auth-tab-register');
  const loginForm = document.getElementById('auth-login-form');
  const regForm = document.getElementById('auth-register-form');

  if (tab === 'login') {
    loginTab.classList.add('active');
    regTab.classList.remove('active');
    loginForm.style.display = 'block';
    regForm.style.display = 'none';
  } else {
    regTab.classList.add('active');
    loginTab.classList.remove('active');
    loginForm.style.display = 'none';
    regForm.style.display = 'block';
  }
}

function fillDemoCredentials(role) {
  if (role === 'admin') {
    window.location.href = 'admin-login.php';
    return;
  }
  switchAuthTab('login');
  const emailInput = document.getElementById('login-email');
  const passInput = document.getElementById('login-password');
  if (emailInput && passInput) {
    emailInput.value = 'user@cars24.com';
    passInput.value = 'user123';
    window.showToast("Filled Customer demo credentials", "info");
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const pass = document.getElementById('login-password').value;

  const result = window.authDB.login(email, pass);
  if (result.success) {
    window.showToast(`Welcome back, ${result.user.name}!`, "success");
    closeAuthModal();
  } else {
    window.showToast(result.message, "error");
  }
}

function handleRegisterSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const phone = document.getElementById('reg-phone').value;
  const password = document.getElementById('reg-password').value;

  const result = window.authDB.register({ name, email, phone, password });
  if (result.success) {
    window.showToast(`Account created! Welcome, ${result.user.name}`, "success");
    closeAuthModal();
  } else {
    window.showToast(result.message, "error");
  }
}

function createAuthModalDOM() {
  const div = document.createElement('div');
  div.id = 'auth-modal';
  div.className = 'modal-overlay';
  div.innerHTML = `
    <div class="modal-box">
      <button class="modal-close-btn" onclick="closeAuthModal()">&times;</button>
      <div class="modal-header">
        <h3 class="modal-title">Welcome to CARS24</h3>
        <p class="modal-subtitle">Log in to view test drives, manage favorites & buy or sell cars</p>
      </div>
      <div class="modal-body">
        <div class="auth-tabs">
          <button id="auth-tab-login" class="auth-tab-btn active" onclick="switchAuthTab('login')">Sign In</button>
          <button id="auth-tab-register" class="auth-tab-btn" onclick="switchAuthTab('register')">Register New Account</button>
        </div>

        <!-- Login Form -->
        <form id="auth-login-form" onsubmit="handleLoginSubmit(event)">
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" id="login-email" class="form-input" placeholder="e.g. user@cars24.com" required>
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" id="login-password" class="form-input" placeholder="Enter password" required>
          </div>
          <button type="submit" class="btn-primary" style="width: 100%; padding: 12px; margin-top: 10px;">Sign In to Account</button>
          
          <!-- 1-Click Demo Credentials for User -->
          <div class="demo-credentials-box">
            <div class="demo-credentials-title">⚡ Quick Customer Demo Account</div>
            <div class="quick-demo-buttons">
              <button type="button" class="btn-demo-fill" style="width: 100%; justify-content: center;" onclick="fillDemoCredentials('user')">
                👤 Fill Customer Credentials (user@cars24.com)
              </button>
            </div>
            <div style="text-align: center; margin-top: 14px; padding-top: 10px; border-top: 1px dashed var(--border);">
              <a href="admin-login.php" style="color: var(--primary); font-size: 0.84rem; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
                🛡️ Authorized Administrator? Go to Admin Login &rarr;
              </a>
            </div>
          </div>
        </form>

        <!-- Register Form (Exclusively for customer registration - NO admin option) -->
        <form id="auth-register-form" style="display: none;" onsubmit="handleRegisterSubmit(event)">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" id="reg-name" class="form-input" placeholder="e.g. Amit Kumar" required>
          </div>
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" id="reg-email" class="form-input" placeholder="e.g. amit@example.com" required>
          </div>
          <div class="form-group">
            <label class="form-label">Mobile Number</label>
            <input type="tel" id="reg-phone" class="form-input" placeholder="e.g. 9876543210" required>
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" id="reg-password" class="form-input" placeholder="Create a password" required>
          </div>
          <button type="submit" class="btn-primary" style="width: 100%; padding: 12px; margin-top: 10px;">Create Customer Account</button>
        </form>
      </div>
    </div>
  `;
  document.body.appendChild(div);
}

/* ==========================================================================
   WISHLIST SYSTEM
   ========================================================================== */
function initWishlistCounters() {
  const count = window.authDB.getWishlist().length;
  document.querySelectorAll('.auth-wishlist-count, #nav-wishlist-count').forEach(el => {
    el.textContent = count;
  });
}

function toggleWishlist(carId, e) {
  if (e) e.stopPropagation();
  const added = window.authDB.toggleWishlist(carId);
  const car = window.carsDB.getCarById(carId);
  if (added) {
    window.showToast(`Added ${car ? car.title : 'car'} to your Wishlist ❤️`, 'success');
  } else {
    window.showToast(`Removed from Wishlist`, 'info');
  }
}

function syncCardWishlistHearts() {
  const wishlist = window.authDB.getWishlist();
  document.querySelectorAll('.card-fav-btn').forEach(btn => {
    const carId = btn.getAttribute('data-car-id');
    if (wishlist.includes(carId)) {
      btn.classList.add('active');
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
    } else {
      btn.classList.remove('active');
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
    }
  });
}

function openWishlistModal() {
  const wishlistIds = window.authDB.getWishlist();
  const cars = wishlistIds.map(id => window.carsDB.getCarById(id)).filter(Boolean);

  let modal = document.getElementById('wishlist-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'wishlist-modal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  let htmlContent = '';
  if (cars.length === 0) {
    htmlContent = `
      <div class="empty-state" style="padding: 40px 20px;">
        <div class="empty-state-icon">❤️</div>
        <h3>Your Wishlist is Empty</h3>
        <p style="color: var(--text-muted); margin-top: 6px;">Tap the heart icon on any car to save it for later review.</p>
        <button class="btn-primary" style="margin-top: 18px;" onclick="document.getElementById('wishlist-modal').classList.remove('active')">Browse Cars</button>
      </div>
    `;
  } else {
    htmlContent = `
      <div style="display: flex; flex-direction: column; gap: 14px; max-height: 480px; overflow-y: auto;">
        ${cars.map(car => `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border: 1px solid var(--border); border-radius: var(--radius-md); gap: 14px;">
            <img src="${car.image}" onerror="this.src=window.DEFAULT_CAR_IMAGE" style="width: 80px; height: 56px; object-fit: cover; border-radius: 6px;" alt="${car.title}">
            <div style="flex: 1;">
              <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--navy); margin-bottom: 2px;">${car.title}</h4>
              <div style="font-size: 0.8rem; color: var(--text-muted);">${car.fuel} • ${CarsDataManager.formatKm(car.km)} • ${car.city}</div>
              <div style="font-size: 0.95rem; font-weight: 800; color: var(--primary); margin-top: 4px;">${CarsDataManager.formatPrice(car.price)}</div>
            </div>
            <div style="display: flex; gap: 8px;">
              <button class="btn-primary" style="padding: 6px 12px; font-size: 0.8rem;" onclick="document.getElementById('wishlist-modal').classList.remove('active'); openTestDriveModal('${car.id}')">Book Drive</button>
              <button class="btn-outline" style="padding: 6px 10px; font-size: 0.8rem; color: var(--danger);" onclick="toggleWishlist('${car.id}'); openWishlistModal();">Remove</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  modal.innerHTML = `
    <div class="modal-box modal-lg">
      <button class="modal-close-btn" onclick="document.getElementById('wishlist-modal').classList.remove('active')">&times;</button>
      <div class="modal-header">
        <h3 class="modal-title">My Saved Cars (${cars.length})</h3>
        <p class="modal-subtitle">Cars you're interested in buying or test driving</p>
      </div>
      <div class="modal-body">
        ${htmlContent}
      </div>
    </div>
  `;
  modal.classList.add('active');
}

/* ==========================================================================
   MY BOOKINGS MODAL
   ========================================================================== */
function openMyBookingsModal() {
  const user = window.authDB.getCurrentUser();
  const allBookings = window.authDB.getBookings();
  const userBookings = user ? allBookings.filter(b => b.userEmail === user.email) : allBookings;

  let modal = document.getElementById('my-bookings-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'my-bookings-modal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-box modal-lg">
      <button class="modal-close-btn" onclick="document.getElementById('my-bookings-modal').classList.remove('active')">&times;</button>
      <div class="modal-header">
        <h3 class="modal-title">My Test Drive Appointments</h3>
        <p class="modal-subtitle">Track your upcoming inspection and test drive bookings</p>
      </div>
      <div class="modal-body">
        ${userBookings.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon">📅</div>
            <h3>No Scheduled Appointments</h3>
            <p style="color: var(--text-muted); margin-top: 6px;">You haven't scheduled any test drives yet. Find a car and book a free drive!</p>
          </div>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 14px;">
            ${userBookings.map(b => `
              <div style="background: white; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                <div>
                  <div style="font-size: 0.75rem; font-weight: 700; color: var(--primary); text-transform: uppercase;">BOOKING ID: #${b.id}</div>
                  <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--navy); margin: 4px 0;">${b.carTitle}</h4>
                  <div style="font-size: 0.85rem; color: var(--text-muted);">
                    📍 ${b.hub} <br>
                    🗓️ ${b.date} at ${b.time} (${b.type})
                  </div>
                </div>
                <div style="text-align: right;">
                  <span class="status-badge ${b.status.toLowerCase()}">${b.status}</span>
                  <div style="margin-top: 10px;">
                    <button class="btn-outline" style="padding: 4px 10px; font-size: 0.75rem;" onclick="cancelBooking('${b.id}')">Cancel</button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    </div>
  `;
  modal.classList.add('active');
}

function cancelBooking(id) {
  if (confirm("Are you sure you want to cancel this test drive appointment?")) {
    window.authDB.deleteBooking(id);
    window.showToast("Test drive appointment cancelled", "info");
    openMyBookingsModal();
  }
}

/* ==========================================================================
   FLOATING COMPARISON DOCK
   ========================================================================== */
function initCompareDock() {
  let dock = document.getElementById('floating-compare-dock');
  if (!dock) {
    dock = document.createElement('div');
    dock.id = 'floating-compare-dock';
    dock.className = 'floating-compare-dock';
    document.body.appendChild(dock);
  }

  const compareIds = window.authDB.getCompareList();
  const cars = compareIds.map(id => window.carsDB.getCarById(id)).filter(Boolean);

  if (cars.length > 0) {
    dock.innerHTML = `
      <div class="compare-dock-thumbs">
        ${cars.map(car => `
          <div class="dock-thumb-wrapper" title="${car.title}">
            <img src="${car.image}" onerror="this.src=window.DEFAULT_CAR_IMAGE" alt="${car.title}">
            <button class="dock-thumb-remove" onclick="removeCompareCar('${car.id}', event)">&times;</button>
          </div>
        `).join('')}
      </div>
      <div class="compare-dock-info">
        <div class="compare-dock-title">Compare Cars (${cars.length}/4)</div>
        <div class="compare-dock-sub">Select up to 4 cars side by side</div>
      </div>
      <div class="dock-actions">
        <a href="compare.php" class="btn-dock-compare">Compare Now</a>
        <button class="btn-dock-clear" onclick="clearAllCompare()">Clear</button>
      </div>
    `;
    dock.classList.add('visible');
  } else {
    dock.classList.remove('visible');
  }

  // Update nav compare counter
  const navBadge = document.getElementById('nav-compare-count');
  if (navBadge) navBadge.textContent = cars.length;
}

function toggleCompareCar(carId, e) {
  if (e) e.stopPropagation();
  const result = window.authDB.toggleCompare(carId);
  const car = window.carsDB.getCarById(carId);

  if (result.maxReached) {
    window.showToast("You can compare up to 4 cars at a time.", "warning");
  } else if (result.added) {
    window.showToast(`Added ${car ? car.title : 'car'} to compare matrix`, "success");
  } else {
    window.showToast(`Removed from comparison`, "info");
  }
}

function removeCompareCar(carId, e) {
  if (e) e.stopPropagation();
  window.authDB.removeFromCompare(carId);
}

function clearAllCompare() {
  window.authDB.clearCompare();
  window.showToast("Comparison tray cleared", "info");
}

function syncCardCompareCheckboxes() {
  const compareList = window.authDB.getCompareList();
  document.querySelectorAll('.compare-card-checkbox').forEach(box => {
    const carId = box.getAttribute('data-car-id');
    box.checked = compareList.includes(carId);
  });
}

/* ==========================================================================
   CATALOG / BROWSE CARS LOGIC (index.php)
   ========================================================================== */
let activeFilters = {
  search: '',
  brands: [],
  fuel: [],
  transmission: [],
  bodyType: [],
  budget: null,
  city: 'all',
  sortBy: 'featured'
};

let currentCatalogSegment = 'used'; // 'used' or 'new'

function initCatalogPage() {
  setupFilterEventListeners();
  renderHomepageNewCarsShowcase();
  renderCatalog();
}

function switchCatalogSegment(segment) {
  currentCatalogSegment = segment;
  const usedTab = document.getElementById('tab-inventory-used');
  const newTab = document.getElementById('tab-inventory-new');
  if (usedTab && newTab) {
    if (segment === 'new') {
      newTab.classList.add('active');
      usedTab.classList.remove('active');
    } else {
      usedTab.classList.add('active');
      newTab.classList.remove('active');
    }
  }
  renderCatalog();
}

function switchHeroTab(tab) {
  const usedTab = document.getElementById('hero-tab-used');
  const newTab = document.getElementById('hero-tab-new');
  if (tab === 'new') {
    if (usedTab) usedTab.classList.remove('active');
    if (newTab) newTab.classList.add('active');
    switchCatalogSegment('new');
    const target = document.getElementById('featured-new-cars') || document.getElementById('browse-cars-anchor');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  } else {
    if (newTab) newTab.classList.remove('active');
    if (usedTab) usedTab.classList.add('active');
    switchCatalogSegment('used');
    const target = document.getElementById('browse-cars-anchor');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }
}

function renderHomepageNewCarsShowcase() {
  const container = document.getElementById('homepage-new-cars-grid');
  if (!container) return;

  const newCars = (window.carsDB.getAllNewCars() || []).slice(0, 6);

  container.innerHTML = newCars.map(car => {
    const monthlyEmi = CarsDataManager.calculateMonthlyEMI(car.exShowroomPrice * 0.85);

    return `
      <div class="car-card" id="home-new-car-${car.id}">
        <div class="car-card-top">
          <img src="${car.image}" onerror="this.src=window.DEFAULT_CAR_IMAGE" alt="${car.title}" class="car-image" loading="lazy">
          <div class="card-badges">
            <span class="badge-new-launch">✨ BRAND NEW 2026</span>
            <span class="waiting-period-chip">⏳ ${car.waitingPeriod} Delivery</span>
          </div>
        </div>

        <div class="car-card-body">
          <div class="car-year-make">${car.brand} • ${car.bodyType} • 0 km Showroom Fresh</div>
          <h3 class="car-title" title="${car.title}">${car.title}</h3>

          <div class="color-dots-row">
            <span class="color-dots-label">Available Shades:</span>
            ${(car.colors || []).map((col) => {
              let bg = '#1e293b';
              const cLow = col.toLowerCase();
              if (cLow.includes('white')) bg = '#ffffff';
              else if (cLow.includes('red') || cLow.includes('orange')) bg = '#dc2626';
              else if (cLow.includes('blue')) bg = '#2563eb';
              else if (cLow.includes('grey') || cLow.includes('gray') || cLow.includes('silver')) bg = '#64748b';
              else if (cLow.includes('gold') || cLow.includes('yellow') || cLow.includes('citrine')) bg = '#f59e0b';
              else if (cLow.includes('green') || cLow.includes('forest') || cLow.includes('emerald')) bg = '#15803d';
              return `<span class="color-dot" style="background:${bg};" title="${col}" onclick="selectNewCarColor('${car.id}', '${col}')"></span>`;
            }).join('')}
          </div>

          <div class="car-specs-chips">
            <span class="spec-chip">${car.fuel}</span>
            <span class="spec-chip">${car.transmission}</span>
            <span class="spec-chip">${car.mileage}</span>
            <span class="spec-chip">⭐ ${car.safetyRating}</span>
          </div>

          <div class="car-pricing-row" style="align-items: flex-start; margin-top: 10px;">
            <div class="new-car-pricing">
              <span class="ex-showroom-label">Ex-Showroom Price:</span>
              <div class="car-main-price">${CarsDataManager.formatPrice(car.exShowroomPrice)}</div>
              <span class="on-road-est">Est. On-Road: ${CarsDataManager.formatPrice(car.onRoadPrice)}</span>
            </div>
            <button class="btn-price-breakdown" onclick="openOnRoadPriceModal('${car.id}')">
              Breakdown &rarr;
            </button>
          </div>
        </div>

        <div class="car-card-footer">
          <div style="font-size: 0.76rem; color: var(--text-muted); display: flex; justify-content: space-between;">
            <span>Refundable Token: <strong>₹${(car.tokenAmount || 10000).toLocaleString('en-IN')}</strong></span>
            <span>Est. EMI: <strong>₹${monthlyEmi.toLocaleString('en-IN')}/mo</strong></span>
          </div>
          <div class="card-actions-grid">
            <button class="btn-card-details" onclick="openOnRoadPriceModal('${car.id}')">Price Details</button>
            <button class="token-btn" onclick="openNewCarBookingModal('${car.id}')">
              ⚡ Book New Car (₹${(car.tokenAmount || 10000).toLocaleString('en-IN')})
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function setupFilterEventListeners() {
  // Global search input
  const searchInput = document.getElementById('global-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeFilters.search = e.target.value.trim().toLowerCase();
      renderCatalog();
    });
  }

  // City selector in navbar
  const citySelect = document.getElementById('navbar-city-select');
  if (citySelect) {
    citySelect.addEventListener('change', (e) => {
      activeFilters.city = e.target.value;
      renderCatalog();
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById('catalog-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeFilters.sortBy = e.target.value;
      renderCatalog();
    });
  }

  // Brand checkboxes
  document.querySelectorAll('.filter-brand-check').forEach(box => {
    box.addEventListener('change', () => {
      activeFilters.brands = Array.from(document.querySelectorAll('.filter-brand-check:checked')).map(b => b.value);
      renderCatalog();
    });
  });

  // Fuel checkboxes
  document.querySelectorAll('.filter-fuel-check').forEach(box => {
    box.addEventListener('change', () => {
      activeFilters.fuel = Array.from(document.querySelectorAll('.filter-fuel-check:checked')).map(b => b.value);
      renderCatalog();
    });
  });

  // Transmission checkboxes
  document.querySelectorAll('.filter-trans-check').forEach(box => {
    box.addEventListener('change', () => {
      activeFilters.transmission = Array.from(document.querySelectorAll('.filter-trans-check:checked')).map(b => b.value);
      renderCatalog();
    });
  });

  // Body type checkboxes
  document.querySelectorAll('.filter-body-check').forEach(box => {
    box.addEventListener('change', () => {
      activeFilters.bodyType = Array.from(document.querySelectorAll('.filter-body-check:checked')).map(b => b.value);
      renderCatalog();
    });
  });

  // Budget quick pills
  document.querySelectorAll('.budget-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      if (pill.classList.contains('active')) {
        pill.classList.remove('active');
        activeFilters.budget = null;
      } else {
        document.querySelectorAll('.budget-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeFilters.budget = pill.getAttribute('data-budget');
      }
      renderCatalog();
    });
  });

  // Clear all filters button
  const clearBtn = document.getElementById('clear-all-filters-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', resetAllFilters);
  }
}

function resetAllFilters() {
  activeFilters = {
    search: '',
    brands: [],
    fuel: [],
    transmission: [],
    bodyType: [],
    budget: null,
    city: 'all',
    sortBy: 'featured'
  };
  document.querySelectorAll('.filters-sidebar input[type="checkbox"]').forEach(c => c.checked = false);
  document.querySelectorAll('.budget-pill').forEach(p => p.classList.remove('active'));
  const searchInput = document.getElementById('global-search-input');
  if (searchInput) searchInput.value = '';
  renderCatalog();
}

function renderCatalog() {
  const container = document.getElementById('cars-grid-container');
  if (!container) return;

  if (currentCatalogSegment === 'new') {
    const allNewCars = window.carsDB.getAllNewCars();

    let filtered = allNewCars.filter(car => {
      // Search
      if (activeFilters.search) {
        const q = activeFilters.search;
        const match = car.title.toLowerCase().includes(q) ||
                      car.brand.toLowerCase().includes(q) ||
                      car.model.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Brand
      if (activeFilters.brands.length > 0) {
        if (!activeFilters.brands.includes(car.brand)) return false;
      }

      // Fuel
      if (activeFilters.fuel.length > 0) {
        const matchesFuel = activeFilters.fuel.some(f => car.fuel.toLowerCase().includes(f.toLowerCase()));
        if (!matchesFuel) return false;
      }

      // Body Type
      if (activeFilters.bodyType.length > 0) {
        if (!activeFilters.bodyType.includes(car.bodyType)) return false;
      }

      // Budget
      if (activeFilters.budget) {
        const price = car.exShowroomPrice;
        if (activeFilters.budget === 'under-6' && price > 600000) return false;
        if (activeFilters.budget === '6-10' && (price < 600000 || price > 1000000)) return false;
        if (activeFilters.budget === '10-15' && (price < 1000000 || price > 1500000)) return false;
        if (activeFilters.budget === 'above-15' && price < 1500000) return false;
      }

      return true;
    });

    // Sorting
    if (activeFilters.sortBy === 'price-low') {
      filtered.sort((a, b) => a.exShowroomPrice - b.exShowroomPrice);
    } else if (activeFilters.sortBy === 'price-high') {
      filtered.sort((a, b) => b.exShowroomPrice - a.exShowroomPrice);
    }

    // Update counter
    const counterEl = document.getElementById('catalog-results-count');
    if (counterEl) {
      counterEl.innerHTML = `Showing <span>${filtered.length}</span> Brand New 2026 Showroom Cars (0 Km Fresh)`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🚘</div>
          <h3>No brand new cars match your filters</h3>
          <p style="color: var(--text-muted); margin-top: 6px;">Try adjusting or clearing your filters to view available factory-fresh launches.</p>
          <button class="btn-primary" style="margin-top: 18px;" onclick="resetAllFilters()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    const compareList = window.authDB.getCompareList();

    container.innerHTML = filtered.map(car => {
      const isCompared = compareList.includes(car.id);
      const monthlyEmi = CarsDataManager.calculateMonthlyEMI(car.exShowroomPrice * 0.85);

      return `
        <div class="car-card" id="car-card-${car.id}">
          <div class="car-card-top">
            <img src="${car.image}" onerror="this.src=window.DEFAULT_CAR_IMAGE" alt="${car.title}" class="car-image" loading="lazy">
            <div class="card-badges">
              <span class="badge-new-launch">✨ BRAND NEW 2026</span>
              <span class="waiting-period-chip">⏳ ${car.waitingPeriod} Delivery</span>
            </div>
          </div>

          <div class="car-card-body">
            <div class="car-year-make">${car.brand} • ${car.bodyType} • 0 km Showroom Fresh</div>
            <h3 class="car-title" title="${car.title}">${car.title}</h3>

            <div class="color-dots-row">
              <span class="color-dots-label">Available Shades:</span>
              ${(car.colors || []).map((col) => {
                let bg = '#1e293b';
                const cLow = col.toLowerCase();
                if (cLow.includes('white')) bg = '#ffffff';
                else if (cLow.includes('red') || cLow.includes('orange')) bg = '#dc2626';
                else if (cLow.includes('blue')) bg = '#2563eb';
                else if (cLow.includes('grey') || cLow.includes('gray') || cLow.includes('silver')) bg = '#64748b';
                else if (cLow.includes('gold') || cLow.includes('yellow') || cLow.includes('citrine')) bg = '#f59e0b';
                else if (cLow.includes('green') || cLow.includes('forest') || cLow.includes('emerald')) bg = '#15803d';
                return `<span class="color-dot" style="background:${bg};" title="${col}" onclick="selectNewCarColor('${car.id}', '${col}')"></span>`;
              }).join('')}
            </div>

            <div class="car-specs-chips">
              <span class="spec-chip">${car.fuel}</span>
              <span class="spec-chip">${car.transmission}</span>
              <span class="spec-chip">${car.mileage}</span>
              <span class="spec-chip">⭐ ${car.safetyRating}</span>
            </div>

            <div class="car-pricing-row" style="align-items: flex-start; margin-top: 10px;">
              <div class="new-car-pricing">
                <span class="ex-showroom-label">Ex-Showroom Price:</span>
                <div class="car-main-price">${CarsDataManager.formatPrice(car.exShowroomPrice)}</div>
                <span class="on-road-est">Est. On-Road: ${CarsDataManager.formatPrice(car.onRoadPrice)}</span>
              </div>
              <button class="btn-price-breakdown" onclick="openOnRoadPriceModal('${car.id}')">
                Breakdown &rarr;
              </button>
            </div>
          </div>

          <div class="car-card-footer">
            <label class="compare-checkbox-label">
              <input type="checkbox" class="compare-card-checkbox" data-car-id="${car.id}" ${isCompared ? 'checked' : ''} onchange="toggleCompareCar('${car.id}', event)">
              Add to Compare
            </label>
            <div class="card-actions-grid">
              <button class="btn-card-details" onclick="openOnRoadPriceModal('${car.id}')">Price Details</button>
              <button class="token-btn" onclick="openNewCarBookingModal('${car.id}')">
                ⚡ Book Online (${CarsDataManager.formatPrice(car.tokenAmount || 10000)})
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
    return;
  }

  const allCars = window.carsDB.getAllCars();

  let filtered = allCars.filter(car => {
    // Search
    if (activeFilters.search) {
      const q = activeFilters.search;
      const match = car.title.toLowerCase().includes(q) ||
                    car.brand.toLowerCase().includes(q) ||
                    car.model.toLowerCase().includes(q) ||
                    car.city.toLowerCase().includes(q);
      if (!match) return false;
    }

    // City
    if (activeFilters.city && activeFilters.city !== 'all') {
      if (car.city.toLowerCase() !== activeFilters.city.toLowerCase()) return false;
    }

    // Brand
    if (activeFilters.brands.length > 0) {
      if (!activeFilters.brands.includes(car.brand)) return false;
    }

    // Fuel
    if (activeFilters.fuel.length > 0) {
      if (!activeFilters.fuel.includes(car.fuel)) return false;
    }

    // Transmission
    if (activeFilters.transmission.length > 0) {
      if (!activeFilters.transmission.includes(car.transmission)) return false;
    }

    // Body Type
    if (activeFilters.bodyType.length > 0) {
      if (!activeFilters.bodyType.includes(car.bodyType)) return false;
    }

    // Budget
    if (activeFilters.budget) {
      const price = car.price;
      if (activeFilters.budget === 'under-6' && price > 600000) return false;
      if (activeFilters.budget === '6-10' && (price < 600000 || price > 1000000)) return false;
      if (activeFilters.budget === '10-15' && (price < 1000000 || price > 1500000)) return false;
      if (activeFilters.budget === 'above-15' && price < 1500000) return false;
    }

    return true;
  });

  // Sorting
  if (activeFilters.sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (activeFilters.sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (activeFilters.sortBy === 'km-low') {
    filtered.sort((a, b) => a.km - b.km);
  } else if (activeFilters.sortBy === 'year-new') {
    filtered.sort((a, b) => b.year - a.year);
  }

  // Update counter
  const counterEl = document.getElementById('catalog-results-count');
  if (counterEl) {
    counterEl.innerHTML = `Showing <span>${filtered.length}</span> Verified Used Cars`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3>No cars match your filters</h3>
        <p style="color: var(--text-muted); margin-top: 6px;">Try adjusting or clearing your filters to see more results.</p>
        <button class="btn-primary" style="margin-top: 18px;" onclick="resetAllFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  const wishlist = window.authDB.getWishlist();
  const compareList = window.authDB.getCompareList();

  container.innerHTML = filtered.map(car => {
    const isFav = wishlist.includes(car.id);
    const isCompared = compareList.includes(car.id);
    const monthlyEmi = CarsDataManager.calculateMonthlyEMI(car.price * 0.85);

    return `
      <div class="car-card" id="car-card-${car.id}">
        <div class="car-card-top">
          <img src="${car.image}" onerror="this.src=window.DEFAULT_CAR_IMAGE" alt="${car.title}" class="car-image" loading="lazy">
          <div class="card-badges">
            ${car.sold ? `<span class="badge-sold">SOLD</span>` : ''}
            <span class="badge-c24-certified">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              CARS24 Certified
            </span>
            <span class="badge-warranty">7 Days Return</span>
          </div>
          <button class="card-fav-btn ${isFav ? 'active' : ''}" data-car-id="${car.id}" onclick="toggleWishlist('${car.id}', event)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
        </div>

        <div class="car-card-body">
          <div class="car-year-make">${car.year} • ${car.ownership}</div>
          <h3 class="car-title" title="${car.title}">${car.title}</h3>

          <div class="car-specs-chips">
            <span class="spec-chip">${CarsDataManager.formatKm(car.km)}</span>
            <span class="spec-chip">${car.fuel}</span>
            <span class="spec-chip">${car.transmission}</span>
            <span class="spec-chip">${car.city}</span>
          </div>

          <div class="car-pricing-row">
            <div>
              <div class="car-main-price">${CarsDataManager.formatPrice(car.price)}</div>
              <div class="car-emi-label">EMI starts <strong>₹${monthlyEmi.toLocaleString('en-IN')}/mo</strong></div>
            </div>
            <div style="font-size: 0.72rem; color: #10b981; font-weight: 700;">
              ✓ 140 Check Passed
            </div>
          </div>
        </div>

        <div class="car-card-footer">
          <label class="compare-checkbox-label">
            <input type="checkbox" class="compare-card-checkbox" data-car-id="${car.id}" ${isCompared ? 'checked' : ''} onchange="toggleCompareCar('${car.id}', event)">
            Add to Compare
          </label>
          <div class="card-actions-grid">
            <button class="btn-card-details" onclick="openCarDetailModal('${car.id}')">View Details</button>
            <button class="btn-card-book" onclick="openTestDriveModal('${car.id}')" ${car.sold ? 'disabled style="opacity: 0.5;"' : ''}>
              ${car.sold ? 'Sold Out' : 'Book Test Drive'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   CAR DETAIL MODAL
   ========================================================================== */
function openCarDetailModal(carId) {
  const car = window.carsDB.getCarById(carId);
  if (!car) return;

  let modal = document.getElementById('car-detail-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'car-detail-modal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  const monthlyEmi = CarsDataManager.calculateMonthlyEMI(car.price * 0.85);

  modal.innerHTML = `
    <div class="modal-box modal-xl">
      <button class="modal-close-btn" onclick="document.getElementById('car-detail-modal').classList.remove('active')">&times;</button>
      <div class="modal-header">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
          <div>
            <div class="car-year-make">${car.year} • ${car.ownership} • ${car.rto}</div>
            <h2 class="modal-title">${car.title}</h2>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 1.6rem; font-weight: 900; color: var(--primary);">${CarsDataManager.formatPrice(car.price)}</div>
            <div style="font-size: 0.82rem; color: var(--text-muted);">Est. EMI: ₹${monthlyEmi.toLocaleString('en-IN')}/month</div>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <div class="detail-modal-grid">
          <div>
            <div class="detail-img-box">
              <img src="${car.image}" onerror="this.src=window.DEFAULT_CAR_IMAGE" alt="${car.title}">
            </div>
            
            <div class="inspection-report-box">
              <div>
                <strong style="color: #065f46; font-size: 0.95rem;">CARS24 Quality Assurance</strong>
                <p style="font-size: 0.78rem; color: #047857; margin-top: 2px;">140 points mechanical, electrical & structural inspection</p>
              </div>
              <span class="inspection-score-badge">${car.inspectionScore || '9.4 / 10'}</span>
            </div>

            <div style="margin-top: 18px;">
              <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--navy); margin-bottom: 10px;">Key Loaded Features</h4>
              <div class="features-tag-list">
                ${(car.features || []).map(f => `<span class="feature-tag-chip">✓ ${f}</span>`).join('')}
              </div>
            </div>
          </div>

          <div>
            <h4 style="font-size: 1rem; font-weight: 800; color: var(--navy); margin-bottom: 12px;">Complete Specifications</h4>
            <div class="detail-specs-grid">
              <div class="detail-spec-item">
                <div class="label">Kilometers Run</div>
                <div class="val">${CarsDataManager.formatKm(car.km)}</div>
              </div>
              <div class="detail-spec-item">
                <div class="label">Fuel Type</div>
                <div class="val">${car.fuel}</div>
              </div>
              <div class="detail-spec-item">
                <div class="label">Transmission</div>
                <div class="val">${car.transmission}</div>
              </div>
              <div class="detail-spec-item">
                <div class="label">Ownership</div>
                <div class="val">${car.ownership}</div>
              </div>
              <div class="detail-spec-item">
                <div class="label">Registration Hub</div>
                <div class="val">${car.city} (${car.rto})</div>
              </div>
              <div class="detail-spec-item">
                <div class="label">Engine Capacity</div>
                <div class="val">${car.engine || '1197 cc'}</div>
              </div>
              <div class="detail-spec-item">
                <div class="label">Max Power</div>
                <div class="val">${car.power || '88 bhp'}</div>
              </div>
              <div class="detail-spec-item">
                <div class="label">Mileage (ARAI)</div>
                <div class="val">${car.mileage || '18.5 kmpl'}</div>
              </div>
              <div class="detail-spec-item">
                <div class="label">Safety NCAP Rating</div>
                <div class="val">${car.safetyRating || '4 Star'}</div>
              </div>
              <div class="detail-spec-item">
                <div class="label">Seating Capacity</div>
                <div class="val">${car.seating || 5} Seater</div>
              </div>
            </div>

            <div style="background: #f8fafc; border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 18px; margin-top: 20px;">
              <h5 style="font-weight: 800; color: var(--navy); font-size: 0.9rem; margin-bottom: 8px;">CARS24 Buyer Advantages</h5>
              <ul style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.7; padding-left: 18px;">
                <li>7 Days Easy Returns with 100% Refund</li>
                <li>12 Months / 20,000 km Comprehensive Warranty</li>
                <li>Zero Downpayment Loan options available</li>
                <li>Free doorstep test drive & documentation transfer</li>
              </ul>

              <div style="display: flex; gap: 10px; margin-top: 18px;">
                <button class="btn-primary" style="flex: 1;" onclick="document.getElementById('car-detail-modal').classList.remove('active'); openTestDriveModal('${car.id}')" ${car.sold ? 'disabled' : ''}>
                  Book Free Test Drive
                </button>
                <a href="compare.php" class="btn-outline" onclick="window.authDB.toggleCompare('${car.id}')">
                  Compare
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  modal.classList.add('active');
}

/* ==========================================================================
   TEST DRIVE BOOKING MODAL
   ========================================================================== */
function openTestDriveModal(carId) {
  const car = window.carsDB.getCarById(carId);
  if (!car) return;

  const user = window.authDB.getCurrentUser();

  let modal = document.getElementById('test-drive-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'test-drive-modal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  // Tomorrow's date formatted for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  modal.innerHTML = `
    <div class="modal-box">
      <button class="modal-close-btn" onclick="document.getElementById('test-drive-modal').classList.remove('active')">&times;</button>
      <div class="modal-header">
        <h3 class="modal-title">Schedule Free Test Drive</h3>
        <p class="modal-subtitle">Experience the car before you decide to buy</p>
      </div>
      <div class="modal-body">
        <div style="display: flex; gap: 12px; align-items: center; background: #f8fafc; padding: 12px; border-radius: var(--radius-md); margin-bottom: 20px;">
          <img src="${car.image}" onerror="this.src=window.DEFAULT_CAR_IMAGE" style="width: 70px; height: 50px; object-fit: cover; border-radius: 6px;" alt="${car.title}">
          <div>
            <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--navy);">${car.title}</h4>
            <div style="font-size: 0.8rem; color: var(--primary); font-weight: 700;">${CarsDataManager.formatPrice(car.price)}</div>
          </div>
        </div>

        <form id="test-drive-form" onsubmit="handleTestDriveSubmit(event, '${car.id}', '${car.title.replace(/'/g, "\\'")}')">
          <div class="form-group">
            <label class="form-label">Your Full Name</label>
            <input type="text" id="td-name" class="form-input" value="${user ? user.name : ''}" placeholder="Enter name" required>
          </div>
          <div class="form-group">
            <label class="form-label">Phone Number</label>
            <input type="tel" id="td-phone" class="form-input" value="${user ? user.phone : ''}" placeholder="10 digit mobile" required>
          </div>
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" id="td-email" class="form-input" value="${user ? user.email : ''}" placeholder="email@domain.com" required>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div class="form-group">
              <label class="form-label">Select Date</label>
              <input type="date" id="td-date" class="form-input" min="${minDateStr}" value="${minDateStr}" required>
            </div>
            <div class="form-group">
              <label class="form-label">Preferred Time Slot</label>
              <select id="td-time" class="form-input" required>
                <option value="10:00 AM">10:00 AM - 12:00 PM</option>
                <option value="01:00 PM">01:00 PM - 03:00 PM</option>
                <option value="04:00 PM" selected>04:00 PM - 06:00 PM</option>
                <option value="06:30 PM">06:30 PM - 08:00 PM</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Drive Mode</label>
            <select id="td-type" class="form-input">
              <option value="Cars24 Mega Hub Drive">At Cars24 Hub (${car.city})</option>
              <option value="Home Doorstep Drive">At My Home Doorstep (Free)</option>
            </select>
          </div>
          <button type="submit" class="btn-primary" style="width: 100%; padding: 12px; margin-top: 10px;">Confirm Test Drive Appointment</button>
        </form>
      </div>
    </div>
  `;
  modal.classList.add('active');
}

function handleTestDriveSubmit(e, carId, carTitle) {
  e.preventDefault();
  const name = document.getElementById('td-name').value;
  const phone = document.getElementById('td-phone').value;
  const email = document.getElementById('td-email').value;
  const date = document.getElementById('td-date').value;
  const time = document.getElementById('td-time').value;
  const type = document.getElementById('td-type').value;

  const newBooking = window.authDB.addBooking({
    carId,
    carTitle,
    userName: name,
    userPhone: phone,
    userEmail: email,
    date,
    time,
    type,
    hub: `Cars24 Verified Hub`
  });

  document.getElementById('test-drive-modal').classList.remove('active');
  window.showToast(`🎉 Test Drive Booked for ${date}! Booking ID: #${newBooking.id}`, 'success');
}

/* ==========================================================================
   CAR COMPARE PAGE & MATRIX (compare.php)
   ========================================================================== */
function initComparePage() {
  renderComparePage();
}

function renderComparePage() {
  const container = document.getElementById('compare-matrix-container');
  if (!container) return;

  const compareIds = window.authDB.getCompareList();
  const allCars = window.carsDB.getAllCars();
  const selectedCars = compareIds.map(id => window.carsDB.getCarById(id)).filter(Boolean);

  if (selectedCars.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 60px 20px;">
        <div class="empty-state-icon">⚖️</div>
        <h3>No Cars Selected for Comparison</h3>
        <p style="color: var(--text-muted); margin-top: 6px;">Choose 2 to 4 cars to compare their prices, engine, mileage, and features side by side.</p>
        <div style="display: flex; justify-content: center; gap: 14px; margin-top: 24px;">
          <a href="index.php" class="btn-primary">Browse & Add Cars</a>
          <button class="btn-outline" onclick="loadDefaultCompareCars()">Compare Popular (Creta vs Swift)</button>
        </div>
      </div>
    `;
    return;
  }

  // Available cars to add in empty slots
  const unselectedCars = allCars.filter(c => !compareIds.includes(c.id));

  // Build columns (max 4)
  const totalCols = 4;
  const slots = [];
  for (let i = 0; i < totalCols; i++) {
    slots.push(selectedCars[i] || null);
  }

  container.innerHTML = `
    <div class="compare-toolbar">
      <div>
        <h3 style="font-weight: 800; color: var(--navy); font-size: 1.1rem;">Comparing ${selectedCars.length} of 4 Cars</h3>
        <p style="font-size: 0.8rem; color: var(--text-muted);">Side by side comparison of technical specs and equipment</p>
      </div>
      <div style="display: flex; gap: 12px;">
        <button class="btn-outline" onclick="clearAllCompare()">Clear All</button>
        <a href="index.php" class="btn-primary">+ Add More Cars</a>
      </div>
    </div>

    <div class="compare-matrix-wrapper">
      <table class="compare-table">
        <!-- Car Card Headers -->
        <thead>
          <tr>
            <th class="compare-feature-label-col" style="background: white;">Vehicle Overview</th>
            ${slots.map((car, idx) => {
              if (car) {
                return `
                  <th style="min-width: 240px; vertical-align: top;">
                    <div class="compare-car-card-header">
                      <button class="remove-compare-car-btn" title="Remove" onclick="window.authDB.removeFromCompare('${car.id}')">&times;</button>
                      <img src="${car.image}" onerror="this.src=window.DEFAULT_CAR_IMAGE" class="compare-car-img" alt="${car.title}">
                      <div class="car-year-make">${car.year} • ${car.brand}</div>
                      <div class="compare-car-name">${car.title}</div>
                      <div class="compare-car-price">${CarsDataManager.formatPrice(car.price)}</div>
                      <button class="btn-card-book" style="width: 100%; font-size: 0.8rem;" onclick="openTestDriveModal('${car.id}')">Book Test Drive</button>
                    </div>
                  </th>
                `;
              } else {
                return `
                  <th style="min-width: 240px; vertical-align: top;">
                    <div class="compare-slot-empty">
                      <div style="font-size: 2rem; color: var(--text-light); margin-bottom: 6px;">+</div>
                      <strong style="font-size: 0.9rem; color: var(--navy);">Add Vehicle #${idx + 1}</strong>
                      <select onchange="if(this.value) window.authDB.toggleCompare(this.value)">
                        <option value="">Select a car to compare...</option>
                        ${unselectedCars.map(c => `<option value="${c.id}">${c.title} (${CarsDataManager.formatPrice(c.price)})</option>`).join('')}
                      </select>
                    </div>
                  </th>
                `;
              }
            }).join('')}
          </tr>
        </thead>
        <tbody>
          <!-- SECTION: PRICING & FINANCING -->
          <tr class="compare-section-header">
            <td colspan="${totalCols + 1}">1. Pricing & EMI Financing</td>
          </tr>
          <tr>
            <td class="compare-feature-label-col">Price (Ex-Hub)</td>
            ${slots.map(c => `<td><strong>${c ? CarsDataManager.formatPrice(c.price) : '-'}</strong></td>`).join('')}
          </tr>
          <tr>
            <td class="compare-feature-label-col">Monthly Est. EMI</td>
            ${slots.map(c => `<td>${c ? '₹' + CarsDataManager.calculateMonthlyEMI(c.price * 0.85).toLocaleString('en-IN') + '/mo' : '-'}</td>`).join('')}
          </tr>
          <tr>
            <td class="compare-feature-label-col">Inspection Score</td>
            ${slots.map(c => `<td>${c ? `<span style="color:#059669; font-weight:800;">${c.inspectionScore}</span>` : '-'}</td>`).join('')}
          </tr>
          <tr>
            <td class="compare-feature-label-col">Warranty & Returns</td>
            ${slots.map(c => `<td>${c ? c.warranty : '-'}</td>`).join('')}
          </tr>

          <!-- SECTION: VEHICLE SPECS -->
          <tr class="compare-section-header">
            <td colspan="${totalCols + 1}">2. Technical Specifications</td>
          </tr>
          <tr>
            <td class="compare-feature-label-col">Fuel Type</td>
            ${slots.map(c => `<td>${c ? c.fuel : '-'}</td>`).join('')}
          </tr>
          <tr>
            <td class="compare-feature-label-col">Transmission</td>
            ${slots.map(c => `<td>${c ? c.transmission : '-'}</td>`).join('')}
          </tr>
          <tr>
            <td class="compare-feature-label-col">Kilometers Driven</td>
            ${slots.map(c => `<td>${c ? CarsDataManager.formatKm(c.km) : '-'}</td>`).join('')}
          </tr>
          <tr>
            <td class="compare-feature-label-col">Engine Displacement</td>
            ${slots.map(c => `<td>${c ? (c.engine || '1197 cc') : '-'}</td>`).join('')}
          </tr>
          <tr>
            <td class="compare-feature-label-col">Max Power</td>
            ${slots.map(c => `<td>${c ? (c.power || '88.5 bhp') : '-'}</td>`).join('')}
          </tr>
          <tr>
            <td class="compare-feature-label-col">Certified Mileage</td>
            ${slots.map(c => `<td>${c ? (c.mileage || '18.5 kmpl') : '-'}</td>`).join('')}
          </tr>
          <tr>
            <td class="compare-feature-label-col">Body Type</td>
            ${slots.map(c => `<td>${c ? c.bodyType : '-'}</td>`).join('')}
          </tr>

          <!-- SECTION: SAFETY & CAPACITY -->
          <tr class="compare-section-header">
            <td colspan="${totalCols + 1}">3. Safety, Comfort & Dimensions</td>
          </tr>
          <tr>
            <td class="compare-feature-label-col">NCAP Safety Rating</td>
            ${slots.map(c => `<td>${c ? `⭐ <strong>${c.safetyRating || '4 Star'}</strong>` : '-'}</td>`).join('')}
          </tr>
          <tr>
            <td class="compare-feature-label-col">Airbags</td>
            ${slots.map(c => `<td>${c ? (c.airbags || 2) + ' Airbags' : '-'}</td>`).join('')}
          </tr>
          <tr>
            <td class="compare-feature-label-col">Seating Capacity</td>
            ${slots.map(c => `<td>${c ? (c.seating || 5) + ' Passengers' : '-'}</td>`).join('')}
          </tr>
          <tr>
            <td class="compare-feature-label-col">Key Features</td>
            ${slots.map(c => `
              <td>
                ${c ? `<ul style="padding-left:16px; font-size:0.8rem; line-height:1.6; color:var(--text-main);">
                  ${(c.features || []).slice(0, 5).map(f => `<li>${f}</li>`).join('')}
                </ul>` : '-'}
              </td>
            `).join('')}
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function loadDefaultCompareCars() {
  const all = window.carsDB.getAllCars();
  if (all.length >= 2) {
    window.authDB.clearCompare();
    window.authDB.toggleCompare(all[0].id);
    window.authDB.toggleCompare(all[1].id);
    renderComparePage();
  }
}

/* ==========================================================================
   EMI CALCULATOR PAGE (emi.php)
   ========================================================================== */
let emiState = {
  carPrice: 1000000,
  downPayment: 200000,
  interestRate: 9.5,
  tenureYears: 5
};

function initEmiCalculatorPage() {
  const priceSlider = document.getElementById('emi-price-slider');
  const priceInput = document.getElementById('emi-price-input');
  const dpSlider = document.getElementById('emi-dp-slider');
  const dpInput = document.getElementById('emi-dp-input');
  const rateSlider = document.getElementById('emi-rate-slider');
  const rateInput = document.getElementById('emi-rate-input');

  if (!priceSlider) return;

  // Sync Car Price
  priceSlider.addEventListener('input', (e) => {
    emiState.carPrice = Number(e.target.value);
    priceInput.value = emiState.carPrice.toLocaleString('en-IN');
    // Adjust downpayment max
    dpSlider.max = Math.round(emiState.carPrice * 0.8);
    if (emiState.downPayment > dpSlider.max) {
      emiState.downPayment = Math.round(emiState.carPrice * 0.2);
      dpSlider.value = emiState.downPayment;
      dpInput.value = emiState.downPayment.toLocaleString('en-IN');
    }
    updateEMICalculations();
  });

  priceInput.addEventListener('change', (e) => {
    const val = Number(e.target.value.replace(/,/g, ''));
    if (!isNaN(val) && val >= 100000 && val <= 5000000) {
      emiState.carPrice = val;
      priceSlider.value = val;
      updateEMICalculations();
    }
  });

  // Sync Downpayment
  dpSlider.addEventListener('input', (e) => {
    emiState.downPayment = Number(e.target.value);
    dpInput.value = emiState.downPayment.toLocaleString('en-IN');
    updateEMICalculations();
  });

  dpInput.addEventListener('change', (e) => {
    const val = Number(e.target.value.replace(/,/g, ''));
    if (!isNaN(val) && val >= 0 && val <= emiState.carPrice) {
      emiState.downPayment = val;
      dpSlider.value = val;
      updateEMICalculations();
    }
  });

  // Sync Interest Rate
  rateSlider.addEventListener('input', (e) => {
    emiState.interestRate = Number(e.target.value);
    rateInput.value = emiState.interestRate.toFixed(1);
    updateEMICalculations();
  });

  rateInput.addEventListener('change', (e) => {
    const val = Number(e.target.value);
    if (!isNaN(val) && val >= 6 && val <= 20) {
      emiState.interestRate = val;
      rateSlider.value = val;
      updateEMICalculations();
    }
  });

  // Tenure Pills
  document.querySelectorAll('.tenure-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.tenure-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      emiState.tenureYears = Number(pill.getAttribute('data-years'));
      updateEMICalculations();
    });
  });

  updateEMICalculations();
}

function updateEMICalculations() {
  const principal = emiState.carPrice - emiState.downPayment;
  const tenureMonths = emiState.tenureYears * 12;
  const monthlyRate = (emiState.interestRate / 12) / 100;

  let monthlyEmi = 0;
  let totalPayable = 0;
  let totalInterest = 0;

  if (principal > 0 && monthlyRate > 0) {
    monthlyEmi = Math.round((principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
                            (Math.pow(1 + monthlyRate, tenureMonths) - 1));
    totalPayable = monthlyEmi * tenureMonths;
    totalInterest = totalPayable - principal;
  }

  // Update UI Elements
  const emiValEl = document.getElementById('emi-result-value');
  const principalValEl = document.getElementById('emi-stat-principal');
  const interestValEl = document.getElementById('emi-stat-interest');
  const totalValEl = document.getElementById('emi-stat-total');

  if (emiValEl) emiValEl.textContent = `₹${monthlyEmi.toLocaleString('en-IN')}`;
  if (principalValEl) principalValEl.textContent = `₹${principal.toLocaleString('en-IN')}`;
  if (interestValEl) interestValEl.textContent = `₹${totalInterest.toLocaleString('en-IN')}`;
  if (totalValEl) totalValEl.textContent = `₹${totalPayable.toLocaleString('en-IN')}`;

  // Draw Visual Donut Chart on Canvas
  drawEmiChart(principal, totalInterest);

  // Render Affordable Cars under this EMI
  renderAffordableCars(monthlyEmi);
}

function drawEmiChart(principal, interest) {
  const canvas = document.getElementById('emi-donut-chart');
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  const total = principal + interest;

  canvas.width = 240;
  canvas.height = 240;
  ctx.clearRect(0, 0, 240, 240);

  const cx = 120;
  const cy = 120;
  const radius = 90;
  const innerRadius = 55;

  if (total <= 0) return;

  const principalAngle = (principal / total) * 2 * Math.PI;

  // Principal Slice (Navy)
  ctx.beginPath();
  ctx.arc(cx, cy, radius, -Math.PI / 2, -Math.PI / 2 + principalAngle, false);
  ctx.arc(cx, cy, innerRadius, -Math.PI / 2 + principalAngle, -Math.PI / 2, true);
  ctx.closePath();
  ctx.fillStyle = '#0b1a2d';
  ctx.fill();

  // Interest Slice (Orange)
  ctx.beginPath();
  ctx.arc(cx, cy, radius, -Math.PI / 2 + principalAngle, 1.5 * Math.PI, false);
  ctx.arc(cx, cy, innerRadius, 1.5 * Math.PI, -Math.PI / 2 + principalAngle, true);
  ctx.closePath();
  ctx.fillStyle = '#ef6e0b';
  ctx.fill();
}

function renderAffordableCars(monthlyEmi) {
  const container = document.getElementById('affordable-cars-grid');
  if (!container) return;

  const allCars = window.carsDB.getAllCars();
  // Cars whose starting EMI is within +- 25% of this calculated EMI
  const matches = allCars.filter(car => {
    const carEmi = CarsDataManager.calculateMonthlyEMI(car.price * 0.85);
    return Math.abs(carEmi - monthlyEmi) <= (monthlyEmi * 0.35);
  }).slice(0, 3);

  if (matches.length === 0) {
    container.innerHTML = `<p style="color:var(--text-muted); font-size:0.9rem;">Browse our inventory of 1,000+ certified cars to find your match.</p>`;
    return;
  }

  container.innerHTML = matches.map(car => `
    <div style="background: white; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 12px; display: flex; align-items: center; justify-content: space-between; gap: 14px;">
      <img src="${car.image}" onerror="this.src=window.DEFAULT_CAR_IMAGE" style="width: 74px; height: 50px; object-fit: cover; border-radius: 6px;" alt="${car.title}">
      <div style="flex: 1;">
        <h5 style="font-size: 0.9rem; font-weight: 800; color: var(--navy);">${car.title}</h5>
        <div style="font-size: 0.78rem; color: var(--text-muted);">${car.year} • ${car.fuel} • ${CarsDataManager.formatKm(car.km)}</div>
        <div style="font-size: 0.9rem; font-weight: 800; color: var(--primary);">${CarsDataManager.formatPrice(car.price)}</div>
      </div>
      <button class="btn-primary" style="padding: 6px 12px; font-size: 0.78rem;" onclick="openTestDriveModal('${car.id}')">Book Drive</button>
    </div>
  `).join('');
}

/* ==========================================================================
   SELL CAR VALUATION WIZARD (sell.php)
   ========================================================================== */
function initSellCarPage() {
  const form = document.getElementById('sell-car-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const brand = document.getElementById('sell-brand').value;
    const model = document.getElementById('sell-model').value;
    const year = Number(document.getElementById('sell-year').value);
    const km = Number(document.getElementById('sell-km').value);
    const condition = document.getElementById('sell-condition').value;

    // Valuation calculation algorithm
    let baseValuation = 550000;
    if (brand === 'Maruti Suzuki') baseValuation = 580000;
    if (brand === 'Hyundai') baseValuation = 650000;
    if (brand === 'Tata') baseValuation = 720000;
    if (brand === 'Toyota') baseValuation = 1450000;
    if (brand === 'Mahindra') baseValuation = 1100000;

    // Depreciate for age
    const age = 2026 - year;
    const ageFactor = Math.max(0.4, 1 - (age * 0.08));
    
    // Depreciate for km
    const kmFactor = Math.max(0.65, 1 - ((km / 100000) * 0.15));

    // Condition multiplier
    let condFactor = 1.0;
    if (condition === 'Excellent') condFactor = 1.08;
    if (condition === 'Fair') condFactor = 0.88;

    const estimated = Math.round(baseValuation * ageFactor * kmFactor * condFactor);
    const minRange = Math.round(estimated * 0.95);
    const maxRange = Math.round(estimated * 1.05);

    // Show result
    const resultBox = document.getElementById('sell-valuation-result');
    if (resultBox) {
      resultBox.style.display = 'block';
      resultBox.innerHTML = `
        <div class="valuation-result-box">
          <div style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--navy);">Instant Estimated CARS24 Market Value</div>
          <div class="valuation-range">${CarsDataManager.formatPrice(minRange)} - ${CarsDataManager.formatPrice(maxRange)}</div>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px;">
            Based on recent auction transactions for ${year} ${brand} ${model}
          </p>
          <button class="btn-primary" onclick="bookSellInspection('${brand}', '${model}', '${CarsDataManager.formatPrice(estimated)}')">
            Book Free Doorstep Inspection & Instant Payment
          </button>
        </div>
      `;
      resultBox.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

function bookSellInspection(brand, model, estPrice) {
  window.showToast(`🎉 Home inspection scheduled for your ${brand} ${model}! Final cash payout est: ${estPrice}`, 'success');
}

/* ==========================================================================
   ADMIN PORTAL (admin.php)
   ========================================================================== */
function initAdminPage() {
  const container = document.getElementById('admin-dashboard-view');
  if (!container) return;

  const user = window.authDB.getCurrentUser();
  if (!user || !window.authDB.isAdmin()) {
    // Strictly redirect unauthorized visitors to the separate admin login page
    window.location.replace('admin-login.php');
    return;
  }

  renderAdminDashboard();
}

function renderAdminDashboard() {
  const container = document.getElementById('admin-dashboard-view');
  if (!container) return;

  const cars = window.carsDB.getAllCars();
  const bookings = window.authDB.getBookings();

  const totalValue = cars.reduce((acc, c) => acc + (c.sold ? 0 : c.price), 0);
  const activeCount = cars.filter(c => !c.sold).length;
  const soldCount = cars.filter(c => c.sold).length;

  container.innerHTML = `
    <div class="admin-header-row">
      <div class="admin-title-box">
        <h1>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          CARS24 Inventory & Operations Admin
        </h1>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 4px;">Logged in as <strong>${window.authDB.getCurrentUser().name}</strong> (Administrator)</p>
      </div>
      <div style="display: flex; gap: 10px;">
        <button class="btn-primary" onclick="openAddCarModal()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Add New Vehicle
        </button>
        <button class="btn-outline" onclick="window.carsDB.resetToDefault(); initAdminPage(); window.showToast('Inventory reset to initial catalog', 'info');">
          Reset Data
        </button>
      </div>
    </div>

    <!-- Admin KPI Cards -->
    <div class="admin-stats-grid">
      <div class="admin-stat-card">
        <div class="stat-icon-wrap orange">🚗</div>
        <div class="stat-info-wrap">
          <div class="stat-num">${activeCount}</div>
          <div class="stat-text">Active Inventory</div>
        </div>
      </div>
      <div class="admin-stat-card">
        <div class="stat-icon-wrap green">💰</div>
        <div class="stat-info-wrap">
          <div class="stat-num">${CarsDataManager.formatPrice(totalValue)}</div>
          <div class="stat-text">Total Stock Value</div>
        </div>
      </div>
      <div class="admin-stat-card">
        <div class="stat-icon-wrap">📋</div>
        <div class="stat-info-wrap">
          <div class="stat-num">${bookings.length}</div>
          <div class="stat-text">Test Drive Bookings</div>
        </div>
      </div>
      <div class="admin-stat-card">
        <div class="stat-icon-wrap">🤝</div>
        <div class="stat-info-wrap">
          <div class="stat-num">${soldCount}</div>
          <div class="stat-text">Sold Cars</div>
        </div>
      </div>
    </div>

    <!-- Admin Navigation Tabs -->
    <div class="admin-nav-tabs">
      <button class="admin-tab-btn active" id="tab-btn-inventory" onclick="switchAdminTab('inventory')">
        Car Inventory Manager (${cars.length})
      </button>
      <button class="admin-tab-btn" id="tab-btn-bookings" onclick="switchAdminTab('bookings')">
        Test Drive Bookings & Inquiries (${bookings.length})
      </button>
    </div>

    <!-- Tab 1: Inventory Table -->
    <div id="admin-inventory-tab" class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Vehicle Details</th>
            <th>Location / RTO</th>
            <th>Specs</th>
            <th>Listed Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${cars.map(car => `
            <tr>
              <td>
                <div class="admin-car-cell">
                  <img src="${car.image}" onerror="this.src=window.DEFAULT_CAR_IMAGE" class="admin-car-thumb" alt="${car.title}">
                  <div>
                    <strong style="color: var(--navy);">${car.title}</strong>
                    <div style="font-size: 0.78rem; color: var(--text-muted);">${car.year} • ${car.ownership} • ID: ${car.id}</div>
                  </div>
                </div>
              </td>
              <td>${car.city} <br><span style="font-size: 0.75rem; color: var(--text-muted);">${car.rto}</span></td>
              <td>${car.fuel} • ${car.transmission} <br><span style="font-size: 0.75rem; color: var(--text-muted);">${CarsDataManager.formatKm(car.km)}</span></td>
              <td><strong style="color: var(--navy); font-size: 1rem;">${CarsDataManager.formatPrice(car.price)}</strong></td>
              <td>
                <span class="status-badge ${car.sold ? 'sold' : 'available'}">
                  ${car.sold ? 'Sold Out' : 'Available'}
                </span>
              </td>
              <td>
                <div class="action-btn-group">
                  <button class="btn-icon-action" title="Toggle Sold Status" onclick="adminToggleSold('${car.id}')">
                    ${car.sold ? '🔄' : '🏷️'}
                  </button>
                  <button class="btn-icon-action" title="Edit Car" onclick="openEditCarModal('${car.id}')">
                    ✏️
                  </button>
                  <button class="btn-icon-action delete" title="Delete Car" onclick="adminDeleteCar('${car.id}')">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- Tab 2: Bookings Table -->
    <div id="admin-bookings-tab" class="admin-table-container" style="display: none;">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer Info</th>
            <th>Target Car</th>
            <th>Date & Time</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${bookings.map(b => `
            <tr>
              <td><strong>#${b.id}</strong></td>
              <td>
                <strong>${b.userName}</strong><br>
                <span style="font-size: 0.78rem; color: var(--text-muted);">📞 ${b.userPhone} | ✉️ ${b.userEmail}</span>
              </td>
              <td>${b.carTitle}</td>
              <td>${b.date} <br><span style="font-size: 0.78rem; color: var(--text-muted);">${b.time}</span></td>
              <td>${b.type}</td>
              <td><span class="status-badge ${b.status.toLowerCase()}">${b.status}</span></td>
              <td>
                <select onchange="window.authDB.updateBookingStatus('${b.id}', this.value); window.showToast('Status updated to ' + this.value, 'success');" style="padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; border: 1px solid var(--border);">
                  <option value="Confirmed" ${b.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                  <option value="Pending" ${b.status === 'Pending' ? 'selected' : ''}>Pending</option>
                  <option value="Completed" ${b.status === 'Completed' ? 'selected' : ''}>Completed</option>
                  <option value="Cancelled" ${b.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function switchAdminTab(tab) {
  const invTab = document.getElementById('admin-inventory-tab');
  const bkTab = document.getElementById('admin-bookings-tab');
  const btnInv = document.getElementById('tab-btn-inventory');
  const btnBk = document.getElementById('tab-btn-bookings');

  if (tab === 'inventory') {
    invTab.style.display = 'block';
    bkTab.style.display = 'none';
    btnInv.classList.add('active');
    btnBk.classList.remove('active');
  } else {
    invTab.style.display = 'none';
    bkTab.style.display = 'block';
    btnBk.classList.add('active');
    btnInv.classList.remove('active');
  }
}

function adminToggleSold(carId) {
  const car = window.carsDB.toggleSold(carId);
  if (car) {
    window.showToast(`Vehicle status changed to: ${car.sold ? 'SOLD' : 'AVAILABLE'}`, 'info');
    renderAdminDashboard();
  }
}

function adminDeleteCar(carId) {
  if (confirm("Are you sure you want to permanently delete this car from CARS24 inventory?")) {
    window.carsDB.deleteCar(carId);
    window.showToast("Car deleted from inventory", "warning");
    renderAdminDashboard();
  }
}

/* Admin Add / Edit Modal */
function openAddCarModal() {
  openCarFormModal(null);
}

function openEditCarModal(carId) {
  const car = window.carsDB.getCarById(carId);
  openCarFormModal(car);
}

function openCarFormModal(car) {
  const isEdit = !!car;
  let modal = document.getElementById('admin-car-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'admin-car-modal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-box modal-lg">
      <button class="modal-close-btn" onclick="document.getElementById('admin-car-modal').classList.remove('active')">&times;</button>
      <div class="modal-header">
        <h3 class="modal-title">${isEdit ? 'Edit Vehicle Details' : 'Add New Certified Vehicle'}</h3>
        <p class="modal-subtitle">Fill in complete specifications and pricing</p>
      </div>
      <div class="modal-body">
        <form id="admin-car-form" onsubmit="handleCarFormSubmit(event, ${isEdit ? `'${car.id}'` : 'null'})">
          <div class="form-group">
            <label class="form-label">Car Title (Year + Brand + Model + Variant)</label>
            <input type="text" id="form-car-title" class="form-input" value="${car ? car.title : ''}" placeholder="e.g. 2022 Hyundai Venue SX 1.2 Petrol" required>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">
            <div class="form-group">
              <label class="form-label">Brand</label>
              <select id="form-car-brand" class="form-input" required>
                <option value="Hyundai" ${car && car.brand === 'Hyundai' ? 'selected' : ''}>Hyundai</option>
                <option value="Maruti Suzuki" ${car && car.brand === 'Maruti Suzuki' ? 'selected' : ''}>Maruti Suzuki</option>
                <option value="Tata" ${car && car.brand === 'Tata' ? 'selected' : ''}>Tata</option>
                <option value="Honda" ${car && car.brand === 'Honda' ? 'selected' : ''}>Honda</option>
                <option value="Mahindra" ${car && car.brand === 'Mahindra' ? 'selected' : ''}>Mahindra</option>
                <option value="Kia" ${car && car.brand === 'Kia' ? 'selected' : ''}>Kia</option>
                <option value="Toyota" ${car && car.brand === 'Toyota' ? 'selected' : ''}>Toyota</option>
                <option value="Volkswagen" ${car && car.brand === 'Volkswagen' ? 'selected' : ''}>Volkswagen</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Model</label>
              <input type="text" id="form-car-model" class="form-input" value="${car ? car.model : ''}" placeholder="e.g. Venue" required>
            </div>
            <div class="form-group">
              <label class="form-label">Year</label>
              <input type="number" id="form-car-year" class="form-input" value="${car ? car.year : 2022}" min="2012" max="2026" required>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div class="form-group">
              <label class="form-label">Price (INR)</label>
              <input type="number" id="form-car-price" class="form-input" value="${car ? car.price : 850000}" step="5000" required>
            </div>
            <div class="form-group">
              <label class="form-label">Kilometers Driven</label>
              <input type="number" id="form-car-km" class="form-input" value="${car ? car.km : 25000}" required>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">
            <div class="form-group">
              <label class="form-label">Fuel Type</label>
              <select id="form-car-fuel" class="form-input">
                <option value="Petrol" ${car && car.fuel === 'Petrol' ? 'selected' : ''}>Petrol</option>
                <option value="Diesel" ${car && car.fuel === 'Diesel' ? 'selected' : ''}>Diesel</option>
                <option value="CNG" ${car && car.fuel === 'CNG' ? 'selected' : ''}>CNG</option>
                <option value="Electric" ${car && car.fuel === 'Electric' ? 'selected' : ''}>Electric</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Transmission</label>
              <select id="form-car-trans" class="form-input">
                <option value="Manual" ${car && car.transmission === 'Manual' ? 'selected' : ''}>Manual</option>
                <option value="Automatic" ${car && car.transmission === 'Automatic' ? 'selected' : ''}>Automatic</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Body Type</label>
              <select id="form-car-body" class="form-input">
                <option value="SUV" ${car && car.bodyType === 'SUV' ? 'selected' : ''}>SUV</option>
                <option value="Hatchback" ${car && car.bodyType === 'Hatchback' ? 'selected' : ''}>Hatchback</option>
                <option value="Sedan" ${car && car.bodyType === 'Sedan' ? 'selected' : ''}>Sedan</option>
              </select>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div class="form-group">
              <label class="form-label">City Hub</label>
              <select id="form-car-city" class="form-input">
                <option value="Mumbai" ${car && car.city === 'Mumbai' ? 'selected' : ''}>Mumbai</option>
                <option value="Delhi NCR" ${car && car.city === 'Delhi NCR' ? 'selected' : ''}>Delhi NCR</option>
                <option value="Bengaluru" ${car && car.city === 'Bengaluru' ? 'selected' : ''}>Bengaluru</option>
                <option value="Hyderabad" ${car && car.city === 'Hyderabad' ? 'selected' : ''}>Hyderabad</option>
                <option value="Ahmedabad" ${car && car.city === 'Ahmedabad' ? 'selected' : ''}>Ahmedabad</option>
                <option value="Pune" ${car && car.city === 'Pune' ? 'selected' : ''}>Pune</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Ownership</label>
              <select id="form-car-owner" class="form-input">
                <option value="1st Owner" ${car && car.ownership === '1st Owner' ? 'selected' : ''}>1st Owner</option>
                <option value="2nd Owner" ${car && car.ownership === '2nd Owner' ? 'selected' : ''}>2nd Owner</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">High-Resolution Image URL</label>
            <input type="url" id="form-car-img" class="form-input" value="${car ? car.image : 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'}" required>
          </div>

          <button type="submit" class="btn-primary" style="width: 100%; padding: 12px; margin-top: 14px;">
            ${isEdit ? 'Save Changes' : 'Publish Vehicle to Inventory'}
          </button>
        </form>
      </div>
    </div>
  `;
  modal.classList.add('active');
}

function handleCarFormSubmit(e, carId) {
  e.preventDefault();
  const title = document.getElementById('form-car-title').value;
  const brand = document.getElementById('form-car-brand').value;
  const model = document.getElementById('form-car-model').value;
  const year = Number(document.getElementById('form-car-year').value);
  const price = Number(document.getElementById('form-car-price').value);
  const km = Number(document.getElementById('form-car-km').value);
  const fuel = document.getElementById('form-car-fuel').value;
  const transmission = document.getElementById('form-car-trans').value;
  const bodyType = document.getElementById('form-car-body').value;
  const city = document.getElementById('form-car-city').value;
  const ownership = document.getElementById('form-car-owner').value;
  const image = document.getElementById('form-car-img').value;

  const carData = {
    title,
    brand,
    model,
    year,
    price,
    km,
    fuel,
    transmission,
    bodyType,
    city,
    ownership,
    image,
    rto: city.substring(0, 2).toUpperCase() + '-01'
  };

  if (carId) {
    window.carsDB.updateCar(carId, carData);
    window.showToast("Vehicle updated successfully!", "success");
  } else {
    window.carsDB.addCar(carData);
    window.showToast("New vehicle published to CARS24 catalog!", "success");
  }

  document.getElementById('admin-car-modal').classList.remove('active');
  renderAdminDashboard();
}

/* ==========================================================================
   MANDATORY AUTHENTICATION GATE (LOCKS WEBSITE UNTIL LOGGED IN)
   ========================================================================== */
function checkMandatoryAuth() {
  // Never lock the dedicated admin login page
  if (window.location.pathname.includes('admin-login.php') || window.location.pathname.includes('admin-login.html')) {
    document.documentElement.classList.remove('c24-auth-locked');
    document.body.style.overflow = '';
    const existingGate = document.getElementById('c24-mandatory-auth-gate');
    if (existingGate) existingGate.remove();
    return;
  }

  const user = window.authDB.getCurrentUser();
  let gate = document.getElementById('c24-mandatory-auth-gate');

  if (!user) {
    document.documentElement.classList.add('c24-auth-locked');
    document.body.style.overflow = 'hidden';
    if (!gate) {
      renderMandatoryAuthGate();
    } else {
      gate.style.display = 'flex';
    }
  } else {
    document.documentElement.classList.remove('c24-auth-locked');
    document.body.style.overflow = '';
    if (gate) {
      gate.remove();
    }
  }
}

function renderMandatoryAuthGate() {
  let gate = document.getElementById('c24-mandatory-auth-gate');
  if (gate) gate.remove();

  gate = document.createElement('div');
  gate.id = 'c24-mandatory-auth-gate';
  gate.className = 'mandatory-auth-overlay';
  gate.innerHTML = `
    <div class="mandatory-auth-box">
      <div class="mandatory-auth-header">
        <div class="mandatory-auth-security-badge">
          <span>🔒</span> AUTHENTICATION REQUIRED • ACCESS RESTRICTED
        </div>
        <div class="brand-logo">
          <span>CARS</span><span class="brand-badge">24</span>
        </div>
        <h3>Welcome to CARS24</h3>
        <p>Without registering or logging in, the CARS24 platform cannot be opened. Please sign in to your account or register a new one to unlock access.</p>
      </div>

      <div class="mandatory-auth-body">
        <div class="auth-tabs" style="margin-bottom: 20px;">
          <button id="gate-tab-login" class="auth-tab-btn active" onclick="switchGateTab('login')">🔑 Sign In</button>
          <button id="gate-tab-register" class="auth-tab-btn" onclick="switchGateTab('register')">📝 Create Account / Register</button>
        </div>

        <!-- Login Form -->
        <form id="gate-login-form" onsubmit="handleGateLoginSubmit(event)">
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" id="gate-login-email" class="form-input" placeholder="e.g. user@cars24.com" required>
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" id="gate-login-password" class="form-input" placeholder="Enter password" required>
          </div>
          <button type="submit" class="btn-primary" style="width: 100%; padding: 13px; margin-top: 6px; font-weight: 800; font-size: 0.95rem;">
            Sign In & Unlock Website &rarr;
          </button>

          <!-- 1-Click Demo Logins for Customer -->
          <div class="demo-credentials-box" style="margin-top: 18px;">
            <div class="demo-credentials-title">⚡ Instant 1-Click Demo Customer</div>
            <div class="quick-demo-buttons" style="margin-bottom: 6px;">
              <button type="button" class="btn-demo-fill" style="width: 100%; justify-content: center; padding: 10px;" onclick="fillGateDemoCredentials('user', true)" title="Instant Login as Customer">
                👤 Buyer (1-Click Instant Login: user@cars24.com)
              </button>
            </div>
            <div style="margin-top: 14px; text-align: center; border-top: 1px dashed #e2e8f0; padding-top: 10px;">
              <a href="admin-login.php" style="color: var(--primary); font-size: 0.85rem; font-weight: 700; text-decoration: underline;">
                🛡️ Administrator? Sign in via Dedicated Admin Portal &rarr;
              </a>
            </div>
          </div>
        </form>

        <!-- Register Form (Pure Customer Registration - NO Admin Option) -->
        <form id="gate-register-form" style="display: none;" onsubmit="handleGateRegisterSubmit(event)">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" id="gate-reg-name" class="form-input" placeholder="e.g. Amit Kumar" required>
          </div>
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" id="gate-reg-email" class="form-input" placeholder="e.g. amit@example.com" required>
          </div>
          <div class="form-group">
            <label class="form-label">Mobile Number</label>
            <input type="tel" id="gate-reg-phone" class="form-input" placeholder="10 digit mobile" required>
          </div>
          <div class="form-group">
            <label class="form-label">Create Password</label>
            <input type="password" id="gate-reg-password" class="form-input" placeholder="At least 6 characters" required>
          </div>
          <button type="submit" class="btn-primary" style="width: 100%; padding: 13px; margin-top: 6px; font-weight: 800; font-size: 0.95rem;">
            Register Customer Account & Unlock Website &rarr;
          </button>
        </form>
      </div>
    </div>
  `;
  document.body.appendChild(gate);
}

function switchGateTab(tab) {
  const loginTab = document.getElementById('gate-tab-login');
  const regTab = document.getElementById('gate-tab-register');
  const loginForm = document.getElementById('gate-login-form');
  const regForm = document.getElementById('gate-register-form');

  if (tab === 'login') {
    loginTab.classList.add('active');
    regTab.classList.remove('active');
    loginForm.style.display = 'block';
    regForm.style.display = 'none';
  } else {
    regTab.classList.add('active');
    loginTab.classList.remove('active');
    loginForm.style.display = 'none';
    regForm.style.display = 'block';
  }
}

function fillGateDemoCredentials(role, autoLogin = false) {
  if (role === 'admin') {
    window.location.href = 'admin-login.php';
    return;
  }
  switchGateTab('login');
  const email = 'user@cars24.com';
  const pass = 'user123';
  const emailInput = document.getElementById('gate-login-email');
  const passInput = document.getElementById('gate-login-password');
  if (emailInput && passInput) {
    emailInput.value = email;
    passInput.value = pass;
  }
  if (autoLogin) {
    const res = window.authDB.login(email, pass);
    if (res.success) {
      checkMandatoryAuth();
      window.showToast(`Welcome to CARS24, ${res.user.name}! Website unlocked.`, 'success');
      initNavbarAuth();
    }
  } else {
    window.showToast(`Selected Customer demo account`, 'info');
  }
}

function handleGateLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('gate-login-email').value;
  const pass = document.getElementById('gate-login-password').value;

  const res = window.authDB.login(email, pass);
  if (res.success) {
    checkMandatoryAuth();
    initNavbarAuth();
    window.showToast(`Welcome to CARS24, ${res.user.name}! Website access unlocked.`, 'success');
  } else {
    window.showToast(res.message, 'error');
  }
}

function handleGateRegisterSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('gate-reg-name').value;
  const email = document.getElementById('gate-reg-email').value;
  const phone = document.getElementById('gate-reg-phone').value;
  const password = document.getElementById('gate-reg-password').value;

  const res = window.authDB.register({ name, email, phone, password });
  if (res.success) {
    checkMandatoryAuth();
    initNavbarAuth();
    window.showToast(`Account created! Welcome to CARS24, ${res.user.name}`, 'success');
  } else {
    window.showToast(res.message, 'error');
  }
}

/* ==========================================================================
   BRAND NEW CARS STORE LOGIC (new-cars.php)
   ========================================================================== */
let activeNewCarFilters = {
  search: '',
  brand: 'all',
  bodyType: 'all',
  budget: 'all'
};

function initNewCarsPage() {
  setupNewCarFilterEvents();
  renderNewCarsCatalog();
}

function setupNewCarFilterEvents() {
  const searchInput = document.getElementById('new-car-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeNewCarFilters.search = e.target.value.trim().toLowerCase();
      renderNewCarsCatalog();
    });
  }

  const brandSelect = document.getElementById('new-car-brand-select');
  if (brandSelect) {
    brandSelect.addEventListener('change', (e) => {
      activeNewCarFilters.brand = e.target.value;
      renderNewCarsCatalog();
    });
  }

  const bodySelect = document.getElementById('new-car-body-select');
  if (bodySelect) {
    bodySelect.addEventListener('change', (e) => {
      activeNewCarFilters.bodyType = e.target.value;
      renderNewCarsCatalog();
    });
  }

  const budgetSelect = document.getElementById('new-car-budget-select');
  if (budgetSelect) {
    budgetSelect.addEventListener('change', (e) => {
      activeNewCarFilters.budget = e.target.value;
      renderNewCarsCatalog();
    });
  }
}

function renderNewCarsCatalog() {
  const container = document.getElementById('new-cars-grid-container');
  if (!container) return;

  const cars = window.carsDB.getAllNewCars();

  const filtered = cars.filter(car => {
    if (activeNewCarFilters.search) {
      const q = activeNewCarFilters.search;
      if (!car.title.toLowerCase().includes(q) && !car.brand.toLowerCase().includes(q)) return false;
    }
    if (activeNewCarFilters.brand !== 'all' && car.brand.toLowerCase() !== activeNewCarFilters.brand.toLowerCase()) {
      return false;
    }
    if (activeNewCarFilters.bodyType !== 'all' && car.bodyType.toLowerCase() !== activeNewCarFilters.bodyType.toLowerCase()) {
      return false;
    }
    if (activeNewCarFilters.budget !== 'all') {
      const p = car.exShowroomPrice;
      if (activeNewCarFilters.budget === 'under-10' && p > 1000000) return false;
      if (activeNewCarFilters.budget === '10-15' && (p < 1000000 || p > 1500000)) return false;
      if (activeNewCarFilters.budget === 'above-15' && p < 1500000) return false;
    }
    return true;
  });

  const countBadge = document.getElementById('new-cars-count');
  if (countBadge) countBadge.textContent = filtered.length;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🚘</div>
        <h3>No Brand New Cars Match Your Selection</h3>
        <p style="color:var(--text-muted); margin-top:6px;">Try clearing search or filters to see all available launches.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(car => {
    const monthlyEmi = CarsDataManager.calculateMonthlyEMI(car.exShowroomPrice * 0.85);

    return `
      <div class="car-card">
        <div class="car-card-top">
          <img src="${car.image}" onerror="this.src=window.DEFAULT_CAR_IMAGE" alt="${car.title}" class="car-image">
          <div class="card-badges">
            <span class="badge-new-launch">✨ BRAND NEW 2026</span>
            <span class="waiting-period-chip">⏳ ${car.waitingPeriod} Delivery</span>
          </div>
        </div>

        <div class="car-card-body">
          <div class="car-year-make">${car.brand} • ${car.bodyType} • 0 km Showroom</div>
          <h3 class="car-title" title="${car.title}">${car.title}</h3>

          <div class="color-dots-row">
            <span class="color-dots-label">Available Colors:</span>
            ${(car.colors || []).map((col, idx) => {
              let bg = '#1e293b';
              if (col.toLowerCase().includes('white')) bg = '#ffffff';
              if (col.toLowerCase().includes('red')) bg = '#dc2626';
              if (col.toLowerCase().includes('blue')) bg = '#2563eb';
              if (col.toLowerCase().includes('grey') || col.toLowerCase().includes('gray')) bg = '#64748b';
              if (col.toLowerCase().includes('gold') || col.toLowerCase().includes('yellow')) bg = '#f59e0b';
              if (col.toLowerCase().includes('green') || col.toLowerCase().includes('forest')) bg = '#15803d';
              return `<span class="color-dot" style="background:${bg};" title="${col}" onclick="selectNewCarColor('${car.id}', '${col}')"></span>`;
            }).join('')}
          </div>

          <div class="car-specs-chips">
            <span class="spec-chip">${car.fuel}</span>
            <span class="spec-chip">${car.transmission}</span>
            <span class="spec-chip">${car.mileage}</span>
            <span class="spec-chip">⭐ ${car.safetyRating}</span>
          </div>

          <div class="car-pricing-row" style="align-items: flex-start; margin-top: 10px;">
            <div class="new-car-pricing">
              <span class="ex-showroom-label">Ex-Showroom Price:</span>
              <div class="car-main-price">${CarsDataManager.formatPrice(car.exShowroomPrice)}</div>
              <span class="on-road-est">Est. On-Road: ${CarsDataManager.formatPrice(car.onRoadPrice)}</span>
            </div>
            <button class="btn-price-breakdown" onclick="openOnRoadPriceModal('${car.id}')">
              Price Breakdown &rarr;
            </button>
          </div>
        </div>

        <div class="car-card-footer">
          <div style="font-size: 0.76rem; color: var(--text-muted); display: flex; justify-content: space-between;">
            <span>Booking Token: <strong>₹${(car.tokenAmount || 10000).toLocaleString('en-IN')}</strong></span>
            <span>Est. EMI: <strong>₹${monthlyEmi.toLocaleString('en-IN')}/mo</strong></span>
          </div>
          <div class="card-actions-grid">
            <a href="compare.php" class="btn-card-details" onclick="window.authDB.toggleCompare('${car.id}')">Compare</a>
            <button class="token-btn" onclick="openNewCarBookingModal('${car.id}')">
              ⚡ Book Online (${CarsDataManager.formatPrice(car.tokenAmount || 10000)})
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function selectNewCarColor(carId, colorName) {
  window.showToast(`Selected color: ${colorName}`, 'info');
}

/* On-Road Price Breakdown Modal */
function openOnRoadPriceModal(carId) {
  const car = window.carsDB.getNewCarById(carId);
  if (!car) return;

  const exShowroom = car.exShowroomPrice;
  const rtoTax = Math.round(exShowroom * 0.10);
  const insurance = Math.round(exShowroom * 0.045);
  const fastagKit = 4500;
  const totalOnRoad = exShowroom + rtoTax + insurance + fastagKit;

  let modal = document.getElementById('onroad-price-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'onroad-price-modal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-box">
      <button class="modal-close-btn" onclick="document.getElementById('onroad-price-modal').classList.remove('active')">&times;</button>
      <div class="modal-header">
        <h3 class="modal-title">On-Road Price Breakdown</h3>
        <p class="modal-subtitle">${car.title}</p>
      </div>
      <div class="modal-body">
        <div style="background: #f8fafc; border-radius: var(--radius-md); padding: 18px; border: 1px solid var(--border);">
          <div style="display:flex; justify-content:space-between; margin-bottom: 10px; font-size: 0.9rem;">
            <span style="color:var(--text-muted);">1. Ex-Showroom Base Price:</span>
            <strong>${CarsDataManager.formatPrice(exShowroom)}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom: 10px; font-size: 0.9rem;">
            <span style="color:var(--text-muted);">2. State RTO Registration & Road Tax:</span>
            <span>+ ${CarsDataManager.formatPrice(rtoTax)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom: 10px; font-size: 0.9rem;">
            <span style="color:var(--text-muted);">3. Comprehensive Insurance (1+3 Years):</span>
            <span>+ ${CarsDataManager.formatPrice(insurance)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom: 14px; font-size: 0.9rem;">
            <span style="color:var(--text-muted);">4. Fastag, Number Plates & Mandatory Kit:</span>
            <span>+ ₹${fastagKit.toLocaleString('en-IN')}</span>
          </div>

          <div style="border-top: 2px dashed var(--border); padding-top: 12px; display:flex; justify-content:space-between; align-items:center;">
            <strong style="font-size: 1.05rem; color:var(--navy);">Total Estimated On-Road Price:</strong>
            <strong style="font-size: 1.3rem; color:var(--primary);">${CarsDataManager.formatPrice(totalOnRoad)}</strong>
          </div>
        </div>

        <div style="margin-top: 20px;">
          <button class="token-btn" style="width: 100%; padding: 12px;" onclick="document.getElementById('onroad-price-modal').classList.remove('active'); openNewCarBookingModal('${car.id}')">
            Reserve Online with ₹${(car.tokenAmount || 10000).toLocaleString('en-IN')} Token
          </button>
        </div>
      </div>
    </div>
  `;
  modal.classList.add('active');
}

/* Online Token Booking Modal */
function openNewCarBookingModal(carId) {
  const car = window.carsDB.getNewCarById(carId);
  if (!car) return;
  const user = window.authDB.getCurrentUser();

  let modal = document.getElementById('new-car-booking-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'new-car-booking-modal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  const tokenAmt = car.tokenAmount || 10000;

  modal.innerHTML = `
    <div class="modal-box modal-lg">
      <button class="modal-close-btn" onclick="document.getElementById('new-car-booking-modal').classList.remove('active')">&times;</button>
      <div class="modal-header">
        <h3 class="modal-title">Online New Car Booking</h3>
        <p class="modal-subtitle">Reserve allocation priority with 100% refundable token amount</p>
      </div>
      <div class="modal-body">
        <div style="display: flex; gap: 14px; background: #f8fafc; padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border); margin-bottom: 20px;">
          <img src="${car.image}" onerror="this.src=window.DEFAULT_CAR_IMAGE" style="width: 90px; height: 60px; object-fit: cover; border-radius: 6px;" alt="${car.title}">
          <div style="flex:1;">
            <h4 style="font-size: 1rem; font-weight: 800; color: var(--navy);">${car.title}</h4>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${car.fuel} • ${car.transmission} • Waiting: ${car.waitingPeriod}</div>
            <div style="font-size: 0.95rem; font-weight: 800; color: var(--primary); margin-top: 4px;">Ex-Showroom: ${CarsDataManager.formatPrice(car.exShowroomPrice)}</div>
          </div>
        </div>

        <form onsubmit="handleNewCarBookingSubmit(event, '${car.id}')">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" id="nb-name" class="form-input" value="${user ? user.name : ''}" required>
            </div>
            <div class="form-group">
              <label class="form-label">Phone Number</label>
              <input type="tel" id="nb-phone" class="form-input" value="${user ? user.phone : ''}" required>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" id="nb-email" class="form-input" value="${user ? user.email : ''}" required>
            </div>
            <div class="form-group">
              <label class="form-label">Preferred Exterior Color</label>
              <select id="nb-color" class="form-input" required>
                ${(car.colors || ['Black', 'White', 'Silver']).map(c => `<option value="${c}">${c}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Delivery Dealership City</label>
            <select id="nb-city" class="form-input">
              <option value="Mumbai">Mumbai Regional Hub</option>
              <option value="Delhi NCR">Delhi NCR Regional Hub</option>
              <option value="Bengaluru">Bengaluru Regional Hub</option>
              <option value="Hyderabad">Hyderabad Regional Hub</option>
              <option value="Ahmedabad">Ahmedabad Regional Hub</option>
              <option value="Pune">Pune Regional Hub</option>
            </select>
          </div>

          <!-- Payment Simulation Box -->
          <div style="background: #ecfdf5; border: 1.5px solid #a7f3d0; border-radius: var(--radius-md); padding: 16px; margin: 18px 0;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="color: #065f46; font-size: 0.95rem;">Token Amount Payable:</strong>
                <p style="font-size: 0.78rem; color: #047857; margin-top: 2px;">Fully refundable upon cancellation within 7 days</p>
              </div>
              <div style="font-size: 1.4rem; font-weight: 900; color: #059669;">
                ₹${tokenAmt.toLocaleString('en-IN')}
              </div>
            </div>

            <div style="display: flex; gap: 12px; margin-top: 14px;">
              <label style="font-size: 0.85rem; font-weight: 600; color: #065f46; display: flex; align-items: center; gap: 6px;">
                <input type="radio" name="nb-pay" value="UPI" checked> UPI / GPay
              </label>
              <label style="font-size: 0.85rem; font-weight: 600; color: #065f46; display: flex; align-items: center; gap: 6px;">
                <input type="radio" name="nb-pay" value="Card"> Credit / Debit Card
              </label>
              <label style="font-size: 0.85rem; font-weight: 600; color: #065f46; display: flex; align-items: center; gap: 6px;">
                <input type="radio" name="nb-pay" value="NetBanking"> Net Banking
              </label>
            </div>
          </div>

          <button type="submit" class="btn-primary" style="width: 100%; padding: 14px; font-weight: 800; font-size: 1rem;">
            Pay ₹${tokenAmt.toLocaleString('en-IN')} Token & Confirm Booking
          </button>
        </form>
      </div>
    </div>
  `;
  modal.classList.add('active');
}

function handleNewCarBookingSubmit(e, carId) {
  e.preventDefault();
  const car = window.carsDB.getNewCarById(carId);
  const name = document.getElementById('nb-name').value;
  const phone = document.getElementById('nb-phone').value;
  const email = document.getElementById('nb-email').value;
  const color = document.getElementById('nb-color').value;
  const city = document.getElementById('nb-city').value;

  const order = window.authDB.addNewCarBooking({
    carId,
    carTitle: car.title,
    color,
    userName: name,
    userPhone: phone,
    userEmail: email,
    hubCity: city,
    tokenPaid: car.tokenAmount || 10000,
    onRoadEst: car.onRoadPrice
  });

  document.getElementById('new-car-booking-modal').classList.remove('active');

  // Show Booking Confirmation Modal
  openBookingSuccessReceipt(order);
}

function openBookingSuccessReceipt(order) {
  let modal = document.getElementById('booking-receipt-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'booking-receipt-modal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-box" style="text-align: center;">
      <button class="modal-close-btn" onclick="document.getElementById('booking-receipt-modal').classList.remove('active')">&times;</button>
      <div class="modal-body" style="padding: 36px 28px;">
        <div style="width: 64px; height: 64px; background: #ecfdf5; color: #059669; border-radius: 50%; font-size: 2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
          ✓
        </div>
        <h3 style="font-size: 1.4rem; font-weight: 900; color: var(--navy);">New Car Booking Confirmed!</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 4px;">Official CARS24 Digital Token Receipt</p>

        <div style="background: #f8fafc; border: 1.5px dashed var(--border); border-radius: var(--radius-md); padding: 18px; margin: 20px 0; text-align: left;">
          <div style="display:flex; justify-content:space-between; margin-bottom: 8px; font-size: 0.85rem;">
            <span style="color:var(--text-muted);">Booking Order ID:</span>
            <strong style="color:var(--primary);">${order.id}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom: 8px; font-size: 0.85rem;">
            <span style="color:var(--text-muted);">Vehicle Model:</span>
            <strong>${order.carTitle}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom: 8px; font-size: 0.85rem;">
            <span style="color:var(--text-muted);">Exterior Shade:</span>
            <strong>${order.color}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom: 8px; font-size: 0.85rem;">
            <span style="color:var(--text-muted);">Customer:</span>
            <strong>${order.userName} (${order.hubCity})</strong>
          </div>
          <div style="display:flex; justify-content:space-between; border-top: 1px solid var(--border); padding-top: 8px; font-size: 0.9rem;">
            <span style="color:var(--text-muted);">Token Advance Paid:</span>
            <strong style="color:#059669;">₹${order.tokenPaid.toLocaleString('en-IN')} (Confirmed)</strong>
          </div>
        </div>

        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 20px;">
          Our Regional Dealership Manager will reach out within 2 business hours for variant allotment and delivery scheduling.
        </p>

        <button class="btn-primary" style="width: 100%; padding: 12px;" onclick="document.getElementById('booking-receipt-modal').classList.remove('active')">
          Done & Return to Catalog
        </button>
      </div>
    </div>
  `;
  modal.classList.add('active');
}

/* My New Orders Modal */
function openMyNewOrdersModal() {
  const user = window.authDB.getCurrentUser();
  const allOrders = window.authDB.getNewCarBookings();
  const userOrders = user ? allOrders.filter(o => o.userEmail === user.email) : allOrders;

  let modal = document.getElementById('my-new-orders-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'my-new-orders-modal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-box modal-lg">
      <button class="modal-close-btn" onclick="document.getElementById('my-new-orders-modal').classList.remove('active')">&times;</button>
      <div class="modal-header">
        <h3 class="modal-title">My Brand New Car Orders</h3>
        <p class="modal-subtitle">Track your new car online bookings & token advances</p>
      </div>
      <div class="modal-body">
        ${userOrders.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon">🚘</div>
            <h3>No Active Brand New Car Orders</h3>
            <p style="color:var(--text-muted); margin-top:6px;">Browse our 2026 showroom launches and reserve your new car with a refundable token.</p>
            <a href="new-cars.php" class="btn-primary" style="margin-top:16px; display:inline-block;">Explore Brand New Cars</a>
          </div>
        ` : `
          <div style="display:flex; flex-direction:column; gap: 14px;">
            ${userOrders.map(o => `
              <div style="background: white; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                <div>
                  <div style="font-size: 0.75rem; font-weight: 800; color: var(--primary);">ORDER ID: #${o.id}</div>
                  <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--navy); margin: 4px 0;">${o.carTitle}</h4>
                  <div style="font-size: 0.85rem; color: var(--text-muted);">
                    🎨 Selected Shade: <strong>${o.color}</strong> • Hub: <strong>${o.hubCity}</strong><br>
                    🗓️ Booked on ${o.date} | Token Paid: <strong>₹${Number(o.tokenPaid).toLocaleString('en-IN')}</strong>
                  </div>
                </div>
                <div style="text-align: right;">
                  <span class="status-badge available" style="font-size: 0.8rem;">${o.status || 'Confirmed'}</span>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    </div>
  `;
  modal.classList.add('active');
}

