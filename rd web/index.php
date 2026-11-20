<?php
/**
 * CARS24 - Homepage & Certified Used Cars Marketplace
 * Built with PHP, JS, and CSS
 */
require_once __DIR__ . '/includes/config.php';

$pageTitle = 'CARS24 - Buy Brand New & Certified Used Cars | 2026 Launches';
$currentPage = 'home';

require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
?>

  <!-- Hero Section -->
  <section class="hero-section">
    <div class="container">
      <div class="hero-grid">
        <div>
          <div class="hero-badge-tag">
            <span>✨</span> India's Most Trusted Certified Car Marketplace
          </div>
          <h1 class="hero-title">
            Find the right car,<br>at the <span>right price.</span>
          </h1>
          <p class="hero-subtitle">
            Every CARS24 certified vehicle comes rigorously inspected across 140 technical checkpoints with a 7-day money-back guarantee and hassle-free financing.
          </p>

          <div class="hero-badges-row">
            <div class="hero-badge-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              140+ Check Inspection
            </div>
            <div class="hero-badge-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              7-Day 100% Refund
            </div>
            <div class="hero-badge-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
              1 Year Warranty Included
            </div>
          </div>
        </div>

        <!-- Hero Quick Action Box -->
        <div>
          <div class="hero-action-card">
            <div class="hero-card-tabs">
              <button class="hero-card-tab active" id="hero-tab-used" onclick="switchHeroTab('used')">Buy Used Car</button>
              <button class="hero-card-tab" id="hero-tab-new" onclick="switchHeroTab('new')">✨ Buy New Car (2026 Launches)</button>
              <a href="sell.php" class="hero-card-tab" style="display:flex; align-items:center; justify-content:center;">Sell My Car</a>
            </div>

            <div class="hero-quick-filters">
              <div class="hero-select-wrap">
                <label>Budget</label>
                <select id="hero-budget-select" onchange="applyHeroBudget(this.value)">
                  <option value="">Any Budget</option>
                  <option value="under-6">Under ₹6 Lakh</option>
                  <option value="6-10">₹6 Lakh - ₹10 Lakh</option>
                  <option value="10-15">₹10 Lakh - ₹15 Lakh</option>
                  <option value="above-15">Above ₹15 Lakh</option>
                </select>
              </div>

              <div class="hero-select-wrap">
                <label>Body Type</label>
                <select id="hero-body-select" onchange="applyHeroBody(this.value)">
                  <option value="">All Body Styles</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Sedan">Sedan</option>
                </select>
              </div>
            </div>

            <a href="#browse-cars-anchor" class="btn-primary" style="width: 100%; padding: 12px; margin-top: 6px;">
              View Available Cars
            </a>

            <div style="display: flex; justify-content: space-between; margin-top: 16px; font-size: 0.8rem; color: var(--text-muted);">
              <span>⭐ Rated 4.8/5 by 300,000+ car buyers</span>
              <a href="emi.php" style="color: var(--primary); font-weight: 700;">Calculate EMI &rarr;</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- USPs Trust Banner Strip -->
  <section class="usp-section">
    <div class="container">
      <div class="usp-grid">
        <div class="usp-card">
          <div class="usp-icon">🛡️</div>
          <div>
            <div class="usp-title">140 Checkpoint Inspection</div>
            <div class="usp-desc">Engine, suspension, AC, brakes & structure inspected by experts</div>
          </div>
        </div>
        <div class="usp-card">
          <div class="usp-icon">🔄</div>
          <div>
            <div class="usp-title">7 Days Easy Return</div>
            <div class="usp-desc">Didn't like the drive? Return it within 7 days for a 100% full refund</div>
          </div>
        </div>
        <div class="usp-card">
          <div class="usp-icon">📄</div>
          <div>
            <div class="usp-title">Free RC Transfer</div>
            <div class="usp-desc">Complete RTO paperwork & legal transfer managed by CARS24</div>
          </div>
        </div>
        <div class="usp-card">
          <div class="usp-icon">⚡</div>
          <div>
            <div class="usp-title">Zero Downpayment Loans</div>
            <div class="usp-desc">Instant online paperless loan approvals starting at 9.5% p.a.</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Brand New 2026 Showroom Cars Showcase -->
  <section class="featured-new-cars-section" id="featured-new-cars">
    <div class="container">
      <div class="section-header-row">
        <div>
          <div class="section-pill-tag">
            <span>🚘</span> 0 Km Factory Fresh • Direct Showroom Allotment
          </div>
          <h2 class="section-title">
            Buy Brand New <span style="color:var(--primary);">2026 Cars Online</span>
          </h2>
          <p class="section-subtitle">
            Reserve officially launched showroom models from Mahindra, Tata, Hyundai, Maruti, Toyota & Kia. 100% refundable ₹10,000 token, priority chassis allocation, official manufacturer warranty & doorstep delivery.
          </p>
        </div>
        <div class="section-cta-actions">
          <a href="new-cars.php" class="btn-outline-primary" style="display:flex; align-items:center; gap:6px;">
            Open New Car Store (8 Models) &rarr;
          </a>
        </div>
      </div>

      <!-- Top New Car Launches Grid -->
      <div class="cars-grid" id="homepage-new-cars-grid">
        <!-- Dynamically rendered by js/app.js -->
      </div>
    </div>
  </section>

  <!-- Main Catalog & Filtering Section -->
  <main class="catalog-section" id="browse-cars-anchor">
    <div class="container">
      <div class="catalog-layout">
        
        <!-- Filters Sidebar -->
        <aside class="filters-sidebar">
          <div class="filters-header">
            <h3 class="filters-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              Filter Cars
            </h3>
            <button class="clear-filters-btn" id="clear-all-filters-btn">Clear All</button>
          </div>

          <!-- Budget Filter -->
          <div class="filter-group">
            <div class="filter-label">Budget</div>
            <div class="budget-pills">
              <div class="budget-pill" data-budget="under-6">Under ₹6L</div>
              <div class="budget-pill" data-budget="6-10">₹6L - ₹10L</div>
              <div class="budget-pill" data-budget="10-15">₹10L - ₹15L</div>
              <div class="budget-pill" data-budget="above-15">Above ₹15L</div>
            </div>
          </div>

          <!-- Brand Filter -->
          <div class="filter-group">
            <div class="filter-label">Popular Brands</div>
            <div class="filter-options">
              <label class="custom-checkbox">
                <input type="checkbox" class="filter-brand-check" value="Maruti Suzuki">
                <span>Maruti Suzuki</span>
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" class="filter-brand-check" value="Hyundai">
                <span>Hyundai</span>
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" class="filter-brand-check" value="Tata">
                <span>Tata Motors</span>
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" class="filter-brand-check" value="Honda">
                <span>Honda</span>
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" class="filter-brand-check" value="Mahindra">
                <span>Mahindra</span>
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" class="filter-brand-check" value="Kia">
                <span>Kia</span>
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" class="filter-brand-check" value="Toyota">
                <span>Toyota</span>
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" class="filter-brand-check" value="Volkswagen">
                <span>Volkswagen</span>
              </label>
            </div>
          </div>

          <!-- Fuel Filter -->
          <div class="filter-group">
            <div class="filter-label">Fuel Type</div>
            <div class="filter-options">
              <label class="custom-checkbox">
                <input type="checkbox" class="filter-fuel-check" value="Petrol">
                <span>Petrol</span>
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" class="filter-fuel-check" value="Diesel">
                <span>Diesel</span>
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" class="filter-fuel-check" value="CNG">
                <span>CNG</span>
              </label>
            </div>
          </div>

          <!-- Transmission Filter -->
          <div class="filter-group">
            <div class="filter-label">Transmission</div>
            <div class="filter-options">
              <label class="custom-checkbox">
                <input type="checkbox" class="filter-trans-check" value="Automatic">
                <span>Automatic</span>
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" class="filter-trans-check" value="Manual">
                <span>Manual</span>
              </label>
            </div>
          </div>

          <!-- Body Type Filter -->
          <div class="filter-group">
            <div class="filter-label">Body Type</div>
            <div class="filter-options">
              <label class="custom-checkbox">
                <input type="checkbox" class="filter-body-check" value="SUV">
                <span>SUV</span>
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" class="filter-body-check" value="Hatchback">
                <span>Hatchback</span>
              </label>
              <label class="custom-checkbox">
                <input type="checkbox" class="filter-body-check" value="Sedan">
                <span>Sedan</span>
              </label>
            </div>
          </div>
        </aside>

        <!-- Catalog Main Area -->
        <section class="catalog-content">
          <!-- Inventory Segment Switcher: Buy Used vs Buy New Cars -->
          <div class="inventory-segment-switcher">
            <button class="segment-tab active" id="tab-inventory-used" onclick="switchCatalogSegment('used')">
              <span class="segment-tab-icon">🚗</span>
              <span class="segment-tab-label">Certified Used Cars</span>
              <span class="segment-count-badge" id="used-count-pill">8 Available</span>
            </button>
            <button class="segment-tab" id="tab-inventory-new" onclick="switchCatalogSegment('new')">
              <span class="segment-tab-icon">✨</span>
              <span class="segment-tab-label">Brand New 2026 Showroom Cars</span>
              <span class="segment-count-badge new-badge" id="new-count-pill">8 Launches (0 Km)</span>
            </button>
          </div>

          <div class="catalog-content-header">
            <div class="results-count" id="catalog-results-count">
              Showing Verified Used Cars
            </div>

            <div class="sort-select-wrapper">
              <label for="catalog-sort-select">Sort By:</label>
              <select id="catalog-sort-select" class="sort-select">
                <option value="featured">Featured & Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="km-low">Km Driven: Low to High</option>
                <option value="year-new">Model Year: Newest First</option>
              </select>
            </div>
          </div>

          <!-- Cars Grid -->
          <div class="cars-grid" id="cars-grid-container">
            <!-- Dynamically rendered by js/app.js -->
          </div>
        </section>

      </div>
    </div>
  </main>

<?php
$extraScripts = '
  <script>
    // Hero action helpers
    function applyHeroBudget(val) {
      if (!val) return;
      document.querySelectorAll(".budget-pill").forEach(p => {
        if (p.getAttribute("data-budget") === val) {
          p.click();
        }
      });
      const el = document.getElementById("browse-cars-anchor");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }

    function applyHeroBody(val) {
      if (!val) return;
      document.querySelectorAll(".filter-body-check").forEach(c => {
        c.checked = (c.value === val);
        c.dispatchEvent(new Event("change"));
      });
      const el = document.getElementById("browse-cars-anchor");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  </script>
';
require_once __DIR__ . '/includes/footer.php';
?>
