<?php
/**
 * CARS24 - Shared Navigation Bar Component
 */
if (!defined('APP_NAME')) {
    require_once __DIR__ . '/config.php';
}

if (!isset($currentPage)) {
    $currentPage = 'home';
}

// Brand subtitle and custom highlights per page
$brandSub = 'BETTER DRIVES';
if ($currentPage === 'new-cars') {
    $brandSub = 'NEW CAR STORE';
} elseif ($currentPage === 'admin') {
    $brandSub = 'ADMINISTRATOR';
} elseif ($currentPage === 'admin-login') {
    $brandSub = 'ADMIN LOGIN';
}
?>

<!-- Top Announcement Bar -->
<div class="header-top">
  <div class="container">
    <div class="header-top-highlights">
      <?php if ($currentPage === 'admin' || $currentPage === 'admin-login'): ?>
        <div class="highlight-item">
          <span class="badge" style="background:#dc2626;">ADMIN SECURITY GATEWAY</span>
          <span>Restricted Portal: Inventory Management & System Control</span>
        </div>
      <?php elseif ($currentPage === 'new-cars'): ?>
        <div class="highlight-item">
          <span class="badge" style="background:#2563eb;">2026 LAUNCHES</span>
          <span>Brand New Showroom Cars with Priority Delivery</span>
        </div>
        <div class="highlight-item">
          <span class="badge" style="background:#10b981;">REFUNDABLE</span>
          <span>100% Refundable ₹10,000 Token Booking</span>
        </div>
        <div class="highlight-item">
          <span class="badge" style="background:#ef6e0b;">WARRANTY</span>
          <span>Official 3-8 Year Manufacturer Warranty</span>
        </div>
      <?php elseif ($currentPage === 'compare'): ?>
        <div class="highlight-item">
          <span class="badge">COMPARE</span>
          <span>Side-by-Side Detailed Specs & EMI Comparison</span>
        </div>
        <div class="highlight-item">
          <span class="badge" style="background:#10b981;">140 CHECKS</span>
          <span>Verified Mechanical & Structural Reports</span>
        </div>
      <?php elseif ($currentPage === 'emi'): ?>
        <div class="highlight-item">
          <span class="badge">ZERO DOWNPAYMENT</span>
          <span>Up to 100% On-Road Car Financing Available</span>
        </div>
        <div class="highlight-item">
          <span class="badge" style="background:#10b981;">LOW INTEREST</span>
          <span>Starting at 9.5% p.a. with Top Banks & NBFCs</span>
        </div>
      <?php elseif ($currentPage === 'sell'): ?>
        <div class="highlight-item">
          <span class="badge">INSTANT PAYMENT</span>
          <span>Money Transferred Directly To Your Bank Account</span>
        </div>
        <div class="highlight-item">
          <span class="badge" style="background:#10b981;">FREE RC TRANSFER</span>
          <span>Zero Liability & Free Legal Paperwork Handling</span>
        </div>
      <?php else: ?>
        <div class="highlight-item">
          <span class="badge">ASSURED</span>
          <span>140 Quality Checks Passed</span>
        </div>
        <div class="highlight-item">
          <span class="badge" style="background:#10b981;">7 DAYS</span>
          <span>100% Money Back Return Policy</span>
        </div>
        <div class="highlight-item">
          <span class="badge" style="background:#2563eb;">WARRANTY</span>
          <span>12 Months Comprehensive Coverage</span>
        </div>
      <?php endif; ?>
    </div>
    <div class="header-top-support">
      <?php if ($currentPage === 'admin' || $currentPage === 'admin-login'): ?>
        <span>Authorized Desk: <strong>Sujal • Harsh • Paras</strong></span>
      <?php else: ?>
        <span>Toll Free Support: <a href="tel:<?php echo TOLL_FREE_TEL; ?>"><?php echo TOLL_FREE_PHONE; ?></a></span>
      <?php endif; ?>
    </div>
  </div>
</div>

<!-- Sticky Navbar -->
<header class="c24-navbar">
  <div class="container">
    <div class="nav-container">
      <!-- Logo -->
      <a href="index.php" class="brand-logo">
        <span>CARS</span><span class="brand-badge">24</span>
        <span class="brand-sub"><?php echo htmlspecialchars($brandSub, ENT_QUOTES, 'UTF-8'); ?></span>
      </a>

      <?php if ($currentPage === 'home'): ?>
        <!-- City Selector -->
        <div class="city-selector-wrapper">
          <select id="navbar-city-select" class="city-btn">
            <option value="all">📍 All India Hubs</option>
            <option value="Mumbai">📍 Mumbai</option>
            <option value="Delhi NCR">📍 Delhi NCR</option>
            <option value="Bengaluru">📍 Bengaluru</option>
            <option value="Hyderabad">📍 Hyderabad</option>
            <option value="Ahmedabad">📍 Ahmedabad</option>
            <option value="Pune">📍 Pune</option>
          </select>
        </div>

        <!-- Global Search Bar -->
        <div class="search-wrapper">
          <div class="search-input-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="global-search-input" placeholder="Search by brand, model (e.g. Swift, Creta, SUV)...">
          </div>
        </div>
      <?php endif; ?>

      <!-- Navigation Links -->
      <ul class="nav-links">
        <?php if ($currentPage === 'admin-login'): ?>
          <li><a href="index.php">Marketplace Storefront</a></li>
          <li><a href="new-cars.php">Buy New Cars</a></li>
          <li><a href="compare.php">Car Compare</a></li>
          <li><a href="emi.php">EMI Calculator</a></li>
        <?php else: ?>
          <li><a href="index.php" class="<?php echo isActivePage('home', $currentPage); ?>">Buy Used Cars</a></li>
          <li><a href="new-cars.php" class="<?php echo isActivePage('new-cars', $currentPage); ?>">Buy New Cars <span class="nav-new-pulse">2026</span></a></li>
          <li><a href="sell.php" class="<?php echo isActivePage('sell', $currentPage); ?>">Sell Car <?php if ($currentPage === 'home'): ?><span class="nav-badge-pill">Instant Cash</span><?php endif; ?></a></li>
          <li><a href="compare.php" class="<?php echo isActivePage('compare', $currentPage); ?>">Car Compare <span class="nav-badge-pill" id="nav-compare-count">0</span></a></li>
          <li><a href="emi.php" class="<?php echo isActivePage('emi', $currentPage); ?>">EMI Calculator</a></li>
          <li id="nav-admin-link" style="<?php echo ($currentPage === 'admin') ? '' : 'display:none;'; ?>">
            <a href="admin.php" class="<?php echo isActivePage('admin', $currentPage); ?>" style="color:var(--primary); font-weight:800;">🛡️ Admin Dashboard</a>
          </li>
        <?php endif; ?>
      </ul>

      <!-- User Actions (Wishlist & Auth) -->
      <div class="nav-actions">
        <?php if ($currentPage === 'admin-login'): ?>
          <a href="index.php" class="btn-outline" style="text-decoration: none; font-size: 0.85rem; padding: 7px 14px;">
            &larr; Back to Storefront
          </a>
        <?php else: ?>
          <button class="icon-btn" onclick="openWishlistModal()" title="View Wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            <span class="icon-badge" id="nav-wishlist-count">0</span>
          </button>

          <!-- Auth Actions Container (Dynamically populated by js/app.js) -->
          <div id="navbar-auth-actions" style="display: flex; align-items: center; gap: 10px;"></div>
        <?php endif; ?>
      </div>
    </div>
  </div>
</header>
