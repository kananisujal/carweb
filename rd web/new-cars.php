<?php
/**
 * CARS24 - Brand New 2026 Showroom Cars Store
 * Built with PHP, JS, and CSS
 */
require_once __DIR__ . '/includes/config.php';

$pageTitle = 'Buy Brand New Cars Online - 2026 Launches & On-Road Price | CARS24';
$currentPage = 'new-cars';

require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
?>

  <!-- Hero Section -->
  <section class="hero-section" style="background: linear-gradient(135deg, #091a30 0%, #173860 100%);">
    <div class="container">
      <div style="max-width: 780px;">
        <div class="hero-badge-tag" style="background: rgba(37, 99, 235, 0.25); border-color: rgba(59, 130, 246, 0.5); color: #93c5fd;">
          <span>🚘</span> CARS24 New Car Store • 0 Km Fresh Factory Units
        </div>
        <h1 class="hero-title">
          Drive home a <span>Brand New Car</span>,<br>with hassle-free online booking.
        </h1>
        <p class="hero-subtitle">
          Explore the hottest 2026 showroom launches from Mahindra, Tata, Hyundai, Maruti, Toyota and Kia. Transparent on-road pricing with breakdown, zero hidden dealer charges, and priority vehicle allocation.
        </p>

        <div class="hero-badges-row">
          <div class="hero-badge-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#2563eb"><circle cx="12" cy="12" r="10"/></svg>
            0 Km Factory Fresh
          </div>
          <div class="hero-badge-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#10b981"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Fast-Track Allotment
          </div>
          <div class="hero-badge-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#ef6e0b"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
            100% Refundable Token
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Filter & Controls Toolbar -->
  <section style="background: white; border-bottom: 1px solid var(--border); padding: 18px 0; position: sticky; top: 72px; z-index: 100; box-shadow: var(--shadow-sm);">
    <div class="container">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
        <div style="display: flex; align-items: center; gap: 14px; flex: 1; max-width: 400px;">
          <div class="search-input-box" style="width: 100%;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="new-car-search" placeholder="Search new models (e.g. Thar ROXX, Curvv, Creta)...">
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <select id="new-car-brand-select" class="sort-select">
            <option value="all">All Brands</option>
            <option value="Mahindra">Mahindra</option>
            <option value="Tata">Tata Motors</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Maruti Suzuki">Maruti Suzuki</option>
            <option value="Toyota">Toyota</option>
            <option value="Kia">Kia</option>
            <option value="Honda">Honda</option>
          </select>

          <select id="new-car-body-select" class="sort-select">
            <option value="all">All Body Styles</option>
            <option value="SUV">SUV & 4x4</option>
            <option value="Hatchback">Hatchback</option>
          </select>

          <select id="new-car-budget-select" class="sort-select">
            <option value="all">Any Price</option>
            <option value="under-10">Under ₹10 Lakh</option>
            <option value="10-15">₹10 Lakh - ₹15 Lakh</option>
            <option value="above-15">Above ₹15 Lakh</option>
          </select>
        </div>
      </div>
    </div>
  </section>

  <!-- New Cars Catalog Grid -->
  <main class="catalog-section">
    <div class="container">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <h2 style="font-size: 1.4rem; font-weight: 900; color: var(--navy);">
          Explore <span id="new-cars-count" style="color:var(--primary);">8</span> Latest Showroom Cars
        </h2>
        <span style="font-size: 0.85rem; color: var(--text-muted);">
          Click any color circle to view color shades • Token 100% refundable within 7 days
        </span>
      </div>

      <div class="cars-grid" id="new-cars-grid-container">
        <!-- Rendered by js/app.js -->
      </div>
    </div>
  </main>

  <!-- USPs Strip -->
  <section class="usp-section" style="background: #f8fafc; border-top: 1px solid var(--border);">
    <div class="container">
      <div class="usp-grid">
        <div class="usp-card">
          <div class="usp-icon" style="background:#eff6ff; color:#2563eb;">🏬</div>
          <div>
            <div class="usp-title">Direct Showroom Delivery</div>
            <div class="usp-desc">Delivered via authorized flagship dealerships with temporary plates & documentation</div>
          </div>
        </div>
        <div class="usp-card">
          <div class="usp-icon">🏷️</div>
          <div>
            <div class="usp-title">No Waiting Markups</div>
            <div class="usp-desc">Official OEM pricing with zero hidden mandatory accessory bundling charges</div>
          </div>
        </div>
        <div class="usp-card">
          <div class="usp-icon">🔄</div>
          <div>
            <div class="usp-title">Old Car Exchange Bonus</div>
            <div class="usp-desc">Get up to ₹50,000 additional exchange bonus when trading your existing used car</div>
          </div>
        </div>
        <div class="usp-card">
          <div class="usp-icon">🛡️</div>
          <div>
            <div class="usp-title">Standard OEM Warranty</div>
            <div class="usp-desc">Full 3-8 year factory warranty + 24/7 Roadside Assistance across India</div>
          </div>
        </div>
      </div>
    </div>
  </section>

<?php
require_once __DIR__ . '/includes/footer.php';
?>
