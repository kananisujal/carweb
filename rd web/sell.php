<?php
/**
 * CARS24 - Instant Sell Car Valuation & Doorstep Inspection
 * Built with PHP, JS, and CSS
 */
require_once __DIR__ . '/includes/config.php';

$pageTitle = 'Sell Used Car Online - Instant Valuation & Same Day Payment | CARS24';
$currentPage = 'sell';

require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
?>

  <!-- Sell Hero Section -->
  <section class="sell-hero-section">
    <div class="container">
      <div class="sell-layout">
        <div>
          <div class="hero-badge-tag">
            <span>⚡</span> Sell in Under 60 Minutes
          </div>
          <h1 class="hero-title">
            Sell your car for the <span>best price</span>, right from home.
          </h1>
          <p class="hero-subtitle">
            Get an instant AI-powered price estimate, free doorstep vehicle evaluation, and instant bank account credit within minutes of sale.
          </p>

          <div style="display: flex; flex-direction: column; gap: 14px; margin-top: 24px;">
            <div style="display: flex; align-items: center; gap: 12px; color: #cbd5e1;">
              <span style="background: rgba(239, 110, 11, 0.2); color: var(--primary); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800;">1</span>
              <span><strong>Instant Online Valuation:</strong> Tell us your car details</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; color: #cbd5e1;">
              <span style="background: rgba(239, 110, 11, 0.2); color: var(--primary); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800;">2</span>
              <span><strong>Doorstep Inspection:</strong> Free inspection at your convenient slot</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; color: #cbd5e1;">
              <span style="background: rgba(239, 110, 11, 0.2); color: var(--primary); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800;">3</span>
              <span><strong>Instant Payment:</strong> Full payment credited before car handover</span>
            </div>
          </div>
        </div>

        <!-- Sell Wizard Box -->
        <div>
          <div class="sell-wizard-card" id="sell-car-wizard">
            <h3 style="font-size: 1.3rem; font-weight: 900; color: var(--navy); margin-bottom: 6px;">Instant Car Valuation</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">Calculate fair market resale value based on real-time auctions</p>

            <form id="sell-car-form">
              <div class="form-group">
                <label class="form-label">Brand / Make</label>
                <select id="sell-brand" class="form-input" required>
                  <option value="Maruti Suzuki">Maruti Suzuki</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Tata">Tata Motors</option>
                  <option value="Honda">Honda</option>
                  <option value="Mahindra">Mahindra</option>
                  <option value="Kia">Kia</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Volkswagen">Volkswagen</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Model Name</label>
                <input type="text" id="sell-model" class="form-input" placeholder="e.g. Swift, Creta, Nexon, City" required>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div class="form-group">
                  <label class="form-label">Registration Year</label>
                  <select id="sell-year" class="form-input" required>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021" selected>2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Kilometers Driven</label>
                  <input type="number" id="sell-km" class="form-input" value="35000" min="1000" max="250000" required>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Physical Condition</label>
                <select id="sell-condition" class="form-input">
                  <option value="Excellent">Excellent (Minor or no scratches, complete service history)</option>
                  <option value="Good" selected>Good (Normal wear, runs smoothly)</option>
                  <option value="Fair">Fair (Needs minor repairs or touch-ups)</option>
                </select>
              </div>

              <button type="submit" class="btn-primary" style="width: 100%; padding: 12px; margin-top: 8px;">
                Check Instant Car Value
              </button>
            </form>

            <!-- Result Box -->
            <div id="sell-valuation-result" style="display: none;"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Why Sell with CARS24 -->
  <section class="catalog-section" style="background: white;">
    <div class="container">
      <div style="text-align: center; max-width: 650px; margin: 0 auto 40px;">
        <h2 style="font-size: 1.8rem; font-weight: 900; color: var(--navy); margin-bottom: 8px;">Why Sell With CARS24?</h2>
        <p style="color: var(--text-muted);">Avoid tedious classified listings, price haggling, and endless stranger calls.</p>
      </div>

      <div class="usp-grid">
        <div class="usp-card">
          <div class="usp-icon">💸</div>
          <div>
            <div class="usp-title">Highest Value Guarantee</div>
            <div class="usp-desc">Backed by nationwide dealer network bidding simultaneously</div>
          </div>
        </div>
        <div class="usp-card">
          <div class="usp-icon">🏠</div>
          <div>
            <div class="usp-title">Free Doorstep Pickup</div>
            <div class="usp-desc">Our inspection executive visits your home or office for inspection</div>
          </div>
        </div>
        <div class="usp-card">
          <div class="usp-icon">🛡️</div>
          <div>
            <div class="usp-title">Seller Legal Protection</div>
            <div class="usp-desc">Legal indemnity against any road accidents until RC transfer is finished</div>
          </div>
        </div>
        <div class="usp-card">
          <div class="usp-icon">⏱️</div>
          <div>
            <div class="usp-title">Payment in 15 Minutes</div>
            <div class="usp-desc">Receive payment directly into your bank account before handover</div>
          </div>
        </div>
      </div>
    </div>
  </section>

<?php
require_once __DIR__ . '/includes/footer.php';
?>
