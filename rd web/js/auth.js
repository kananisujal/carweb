/**
 * CARS24 AUTHENTICATION, BOOKINGS & USER STATE MANAGER
 */

const USERS_STORAGE_KEY = 'cars24_users_v1';
const SESSION_STORAGE_KEY = 'cars24_current_user_v1';
const WISHLIST_STORAGE_KEY = 'cars24_wishlist_v1';
const COMPARE_STORAGE_KEY = 'cars24_compare_v1';
const BOOKINGS_STORAGE_KEY = 'cars24_bookings_v1';

// STRICT WHITELIST: Only these three credentials can log in as Admin
const AUTHORIZED_ADMINS = [
  {
    id: "usr-admin-sujal",
    name: "Sujal Kanani",
    email: "sujal@gmail.com",
    phone: "9876543210",
    password: "123456",
    role: "admin",
    createdAt: "2024-01-01"
  },
  {
    id: "usr-admin-harsh",
    name: "Harsh",
    email: "harsh@gmail.com",
    phone: "9876543211",
    password: "123456",
    role: "admin",
    createdAt: "2024-01-01"
  },
  {
    id: "usr-admin-paras",
    name: "Paras",
    email: "paras@gmail.com",
    phone: "9876543212",
    password: "123456",
    role: "admin",
    createdAt: "2024-01-01"
  }
];

// Seed initial users
const SEED_USERS = [
  ...AUTHORIZED_ADMINS,
  {
    id: "usr-user-01",
    name: "Rahul Sharma",
    email: "user@cars24.com",
    phone: "9812345678",
    password: "user123",
    role: "user",
    createdAt: "2024-02-15"
  }
];

// Initial demo bookings
const SEED_BOOKINGS = [
  {
    id: "bk-1001",
    carId: "c24-101",
    carTitle: "2021 Hyundai Creta SX (O) 1.5 Petrol",
    userName: "Rahul Sharma",
    userEmail: "user@cars24.com",
    userPhone: "9812345678",
    type: "Test Drive",
    hub: "Cars24 Hub - Andheri West, Mumbai",
    date: "2026-09-28",
    time: "11:00 AM",
    status: "Confirmed",
    createdAt: "2026-09-24"
  },
  {
    id: "bk-1002",
    carId: "c24-103",
    carTitle: "2022 Tata Nexon Fearless Plus S (Dark)",
    userName: "Priya Patel",
    userEmail: "priya.p@gmail.com",
    userPhone: "9823456789",
    type: "Home Test Drive",
    hub: "Cars24 Hub - Koramangala, Bengaluru",
    date: "2026-09-29",
    time: "03:30 PM",
    status: "Pending",
    createdAt: "2026-09-24"
  }
];

class AuthManager {
  constructor() {
    this.init();
  }

  init() {
    let users = [];
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      users = stored ? JSON.parse(stored) : [];
    } catch(e) {
      users = [];
    }

    if (!Array.isArray(users) || users.length === 0) {
      users = [...SEED_USERS];
    } else {
      // Remove any legacy admin@cars24.com
      users = users.filter(u => (u.email || '').toLowerCase() !== 'admin@cars24.com');

      // Ensure the 3 authorized admin accounts are always present and up-to-date
      AUTHORIZED_ADMINS.forEach(admin => {
        const idx = users.findIndex(u => (u.email || '').toLowerCase() === admin.email.toLowerCase());
        if (idx > -1) {
          users[idx].role = 'admin';
          users[idx].password = admin.password;
          users[idx].name = admin.name;
        } else {
          users.unshift(admin);
        }
      });

      // Strip admin role from any user who is NOT in AUTHORIZED_ADMINS
      users.forEach(u => {
        const isWhitelisted = AUTHORIZED_ADMINS.some(a => a.email.toLowerCase() === (u.email || '').toLowerCase());
        if (!isWhitelisted && u.role === 'admin') {
          u.role = 'user';
        }
      });
    }

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    // Validate current session
    try {
      const sessionStr = localStorage.getItem(SESSION_STORAGE_KEY);
      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        if (session && session.role === 'admin') {
          const isWhitelisted = AUTHORIZED_ADMINS.some(a => a.email.toLowerCase() === (session.email || '').toLowerCase());
          if (!isWhitelisted) {
            localStorage.removeItem(SESSION_STORAGE_KEY);
          }
        }
      }
    } catch (e) {}

    if (!localStorage.getItem(BOOKINGS_STORAGE_KEY)) {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(SEED_BOOKINGS));
    }
    if (!localStorage.getItem(WISHLIST_STORAGE_KEY)) {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(["c24-101", "c24-103"]));
    }
    if (!localStorage.getItem(COMPARE_STORAGE_KEY)) {
      localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(["c24-101", "c24-102"]));
    }
  }

  getUsers() {
    try {
      const data = localStorage.getItem(USERS_STORAGE_KEY);
      return data ? JSON.parse(data) : SEED_USERS;
    } catch (e) {
      return SEED_USERS;
    }
  }

  getCurrentUser() {
    try {
      const session = localStorage.getItem(SESSION_STORAGE_KEY);
      return session ? JSON.parse(session) : null;
    } catch (e) {
      return null;
    }
  }

  isLoggedIn() {
    return !!this.getCurrentUser();
  }

  // Strict check: Only the 3 authorized admin accounts can ever evaluate to true
  isAdmin() {
    const user = this.getCurrentUser();
    if (!user || user.role !== 'admin') return false;
    const cleanEmail = (user.email || '').trim().toLowerCase();
    return AUTHORIZED_ADMINS.some(a => a.email.toLowerCase() === cleanEmail);
  }

  getAuthorizedAdmins() {
    return AUTHORIZED_ADMINS;
  }

  // General login (used by normal login modals)
  login(email, password) {
    const users = this.getUsers();
    const cleanEmail = (email || '').trim().toLowerCase();
    const found = users.find(u => u.email.toLowerCase() === cleanEmail && u.password === password);

    if (found) {
      // Check if user is one of the 3 authorized admins
      const isAdminAccount = AUTHORIZED_ADMINS.some(a => a.email.toLowerCase() === cleanEmail);
      const sessionData = {
        id: found.id,
        name: found.name,
        email: found.email,
        phone: found.phone,
        role: isAdminAccount ? 'admin' : 'user'
      };
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
      window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { user: sessionData } }));
      return { success: true, user: sessionData };
    }

    return { success: false, message: "Invalid email or password. Please verify credentials." };
  }

  // Dedicated Admin Login: STRICTLY permits ONLY the 3 authorized admin credentials
  loginAdmin(email, password) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    // Check against authorized admin list
    const found = AUTHORIZED_ADMINS.find(
      a => a.email.toLowerCase() === cleanEmail && a.password === cleanPassword
    );

    if (found) {
      const sessionData = {
        id: found.id,
        name: found.name,
        email: found.email,
        phone: found.phone,
        role: 'admin'
      };
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
      window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { user: sessionData } }));
      return { success: true, user: sessionData };
    }

    // Check if email is recognized as an authorized admin ID
    const isAllowedEmail = AUTHORIZED_ADMINS.some(a => a.email.toLowerCase() === cleanEmail);
    if (isAllowedEmail) {
      return { success: false, message: "Invalid password for administrator account. Required password: 123456" };
    }

    return {
      success: false,
      message: "Access Denied: Only authorized administrators (sujal@gmail.com, harsh@gmail.com, paras@gmail.com) can log in as Admin."
    };
  }

  // Register: strictly creates ONLY 'user' accounts (NO admin option)
  register({ name, email, phone, password }) {
    const users = this.getUsers();
    const cleanEmail = (email || '').trim().toLowerCase();

    // Prevent registering with an authorized admin email
    if (AUTHORIZED_ADMINS.some(a => a.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: "This email is reserved for CARS24 Administrator access." };
    }

    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: "An account with this email already exists." };
    }

    // Role is ALWAYS enforced as 'user'
    const newUser = {
      id: 'usr-' + Date.now().toString().slice(-6),
      name: name.trim(),
      email: cleanEmail,
      phone: phone ? phone.trim() : '',
      password: password,
      role: 'user',
      createdAt: new Date().toISOString().split('T')[0]
    };

    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    // Auto login
    const sessionData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: 'user'
    };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
    window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { user: sessionData } }));

    return { success: true, user: sessionData };
  }

  logout() {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { user: null } }));
    return true;
  }

  // Bookings / Inquiries
  getBookings() {
    try {
      const b = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      return b ? JSON.parse(b) : [];
    } catch (e) {
      return [];
    }
  }

  addBooking(bookingData) {
    const bookings = this.getBookings();
    const newBooking = {
      id: 'bk-' + Date.now().toString().slice(-5),
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Confirmed',
      ...bookingData
    };
    bookings.unshift(newBooking);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
    window.dispatchEvent(new CustomEvent('bookingsUpdated', { detail: { bookings } }));
    return newBooking;
  }

  updateBookingStatus(id, newStatus) {
    const bookings = this.getBookings();
    const target = bookings.find(b => b.id === id);
    if (target) {
      target.status = newStatus;
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
      window.dispatchEvent(new CustomEvent('bookingsUpdated', { detail: { bookings } }));
      return true;
    }
    return false;
  }

  deleteBooking(id) {
    let bookings = this.getBookings();
    bookings = bookings.filter(b => b.id !== id);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
    window.dispatchEvent(new CustomEvent('bookingsUpdated', { detail: { bookings } }));
    return true;
  }

  // Wishlist
  getWishlist() {
    try {
      const data = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  toggleWishlist(carId) {
    let list = this.getWishlist();
    const index = list.indexOf(carId);
    let isAdded = false;

    if (index > -1) {
      list.splice(index, 1);
      isAdded = false;
    } else {
      list.push(carId);
      isAdded = true;
    }

    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { list, carId, isAdded } }));
    return isAdded;
  }

  isWishlisted(carId) {
    return this.getWishlist().includes(carId);
  }

  // Compare List
  getCompareList() {
    try {
      const data = localStorage.getItem(COMPARE_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  toggleCompare(carId) {
    let list = this.getCompareList();
    const index = list.indexOf(carId);

    if (index > -1) {
      list.splice(index, 1);
      localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('compareUpdated', { detail: { list, carId, action: 'removed' } }));
      return { added: false, count: list.length };
    } else {
      if (list.length >= 4) {
        return { added: false, count: list.length, maxReached: true };
      }
      list.push(carId);
      localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('compareUpdated', { detail: { list, carId, action: 'added' } }));
      return { added: true, count: list.length };
    }
  }

  removeFromCompare(carId) {
    let list = this.getCompareList();
    list = list.filter(id => id !== carId);
    localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('compareUpdated', { detail: { list, carId, action: 'removed' } }));
    return list;
  }

  clearCompare() {
    localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify([]));
    window.dispatchEvent(new CustomEvent('compareUpdated', { detail: { list: [], action: 'cleared' } }));
  }

  isCompared(carId) {
    return this.getCompareList().includes(carId);
  }

  // Brand New Car Bookings / Token Orders
  getNewCarBookings() {
    try {
      const data = localStorage.getItem('cars24_new_orders_v1');
      return data ? JSON.parse(data) : [
        {
          id: "ORD-9011",
          carId: "nc-201",
          carTitle: "2026 Mahindra Thar ROXX (5-Door)",
          color: "Stealth Black",
          userName: "Rahul Sharma",
          userEmail: "user@cars24.com",
          userPhone: "9812345678",
          tokenPaid: 10000,
          onRoadEst: 1515000,
          status: "Allotted",
          hubCity: "Mumbai",
          date: "2026-09-24"
        }
      ];
    } catch (e) {
      return [];
    }
  }

  addNewCarBooking(orderData) {
    const orders = this.getNewCarBookings();
    const newOrder = {
      id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString().split('T')[0],
      status: "Confirmed",
      ...orderData
    };
    orders.unshift(newOrder);
    localStorage.setItem('cars24_new_orders_v1', JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent('newOrdersUpdated', { detail: { orders } }));
    return newOrder;
  }
}

// Global Auth Manager instance
window.authDB = new AuthManager();

// Global Toast Notification Helper
window.showToast = function(message, type = 'info') {
  let toastContainer = document.getElementById('c24-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'c24-toast-container';
    toastContainer.className = 'c24-toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `c24-toast c24-toast-${type}`;
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'error') icon = '⚠️';
  if (type === 'warning') icon = '🔔';

  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-msg">${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
};
