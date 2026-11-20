<?php
/**
 * CARS24 - Interactive Used Car Loan EMI Calculator
 * Built with PHP, JS, and CSS
 */
require_once __DIR__ . '/includes/config.php';

$pageTitle = 'Used Car Loan EMI Calculator - Interest & Monthly Repayment | CARS24';
$currentPage = 'emi';

require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
?>

  <!-- Hero Header -->
  <section class="emi-header-hero">
    <div class="container">
      <h1>Used Car Loan EMI Calculator</h1>
      <p>Estimate your monthly loan installments, total interest liability and explore certified cars fitting right within your comfort budget.</p>
    </div>
  </section>

  <!-- EMI Calculator Interactive Section -->
  <main class="container" id="emi-calculator-view">
    <div class="emi-calculator-layout">
      
      <!-- Left Inputs Column -->
      <div class="emi-inputs-card">
        <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--navy); margin-bottom: 24px;">Adjust Loan Parameters</h3>

        <!-- Slider 1: Vehicle Price -->
        <div class="emi-slider-group">
          <div class="slider-label-row">
            <span class="slider-title">Vehicle Price</span>
            <div class="slider-value-box">
              <span>₹</span>
              <input type="text" id="emi-price-input" value="10,00,000">
            </div>
          </div>
          <input type="range" id="emi-price-slider" class="range-slider" min="150000" max="4000000" step="25000" value="1000000">
          <div class="slider-min-max">
            <span>₹1.5 Lakh</span>
            <span>₹40 Lakh</span>
          </div>
        </div>

        <!-- Slider 2: Down Payment -->
        <div class="emi-slider-group">
          <div class="slider-label-row">
            <span class="slider-title">Down Payment</span>
            <div class="slider-value-box">
              <span>₹</span>
              <input type="text" id="emi-dp-input" value="2,00,000">
            </div>
          </div>
          <input type="range" id="emi-dp-slider" class="range-slider" min="0" max="800000" step="10000" value="200000">
          <div class="slider-min-max">
            <span>₹0 (Zero Downpayment)</span>
            <span>Up to 80%</span>
          </div>
        </div>

        <!-- Slider 3: Interest Rate -->
        <div class="emi-slider-group">
          <div class="slider-label-row">
            <span class="slider-title">Interest Rate (% p.a.)</span>
            <div class="slider-value-box">
              <input type="text" id="emi-rate-input" value="9.5" style="width: 50px;">
              <span>%</span>
            </div>
          </div>
          <input type="range" id="emi-rate-slider" class="range-slider" min="7.0" max="18.0" step="0.25" value="9.5">
          <div class="slider-min-max">
            <span>7.0%</span>
            <span>18.0%</span>
          </div>
        </div>

        <!-- Tenure Select -->
        <div class="emi-slider-group">
          <div class="slider-label-row">
            <span class="slider-title">Loan Duration (Tenure)</span>
          </div>
          <div class="tenure-pills">
            <button class="tenure-pill" data-years="1">1 Yr</button>
            <button class="tenure-pill" data-years="2">2 Yrs</button>
            <button class="tenure-pill" data-years="3">3 Yrs</button>
            <button class="tenure-pill" data-years="4">4 Yrs</button>
            <button class="tenure-pill active" data-years="5">5 Yrs</button>
            <button class="tenure-pill" data-years="7">7 Yrs</button>
          </div>
        </div>

        <!-- Financing USPs -->
        <div style="background: #f8fafc; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 18px; margin-top: 30px;">
          <h4 style="font-weight: 800; font-size: 0.92rem; color: var(--navy); margin-bottom: 8px;">Why Finance Through CARS24?</h4>
          <ul style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.7; padding-left: 18px;">
            <li>Pre-approved digital sanctions in under 10 minutes</li>
            <li>Partnerships with HDFC, ICICI, Axis & Kotak Mahindra Bank</li>
            <li>Zero hidden processing surcharges & minimal documentation</li>
            <li>Flexible prepayment and foreclosure options</li>
          </ul>
        </div>
      </div>

      <!-- Right Summary Card -->
      <div>
        <div class="emi-summary-card">
          <div>
            <!-- Main Result -->
            <div class="emi-main-result-box">
              <div class="emi-result-label">Your Estimated Monthly EMI</div>
              <div class="emi-result-amount" id="emi-result-value">₹16,801</div>
              <div class="emi-result-tenure">Calculated for 5 Years @ 9.5% interest</div>
            </div>

            <!-- Visual Donut Chart & Breakdown -->
            <div class="emi-breakdown-row">
              <div class="emi-chart-wrapper">
                <canvas id="emi-donut-chart"></canvas>
              </div>
              <div class="emi-breakdown-stats">
                <div class="stat-item">
                  <span class="stat-name"><span class="stat-dot principal"></span>Principal Loan</span>
                  <span class="stat-value" id="emi-stat-principal">₹8,00,000</span>
                </div>
                <div class="stat-item">
                  <span class="stat-name"><span class="stat-dot interest"></span>Total Interest</span>
                  <span class="stat-value" id="emi-stat-interest">₹2,08,060</span>
                </div>
              </div>
            </div>

            <!-- Total Payable -->
            <div class="emi-total-payable">
              <span>Total Amount Payable:</span>
              <span class="total-highlight" id="emi-stat-total">₹10,08,060</span>
            </div>

            <button class="btn-primary" style="width: 100%; padding: 14px; font-size: 0.95rem;" onclick="applyForLoan()">
              Apply for Pre-Approved Loan Online
            </button>
          </div>

          <!-- Recommended Cars in this EMI range -->
          <div style="margin-top: 32px; border-top: 1px solid var(--border); padding-top: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--navy);">Cars Under This EMI</h4>
              <a href="index.php" style="font-size: 0.78rem; font-weight: 700; color: var(--primary);">View All &rarr;</a>
            </div>
            <div id="affordable-cars-grid" style="display: flex; flex-direction: column; gap: 10px;">
              <!-- Populated by js/app.js -->
            </div>
          </div>
        </div>
      </div>

    </div>
  </main>

<?php
$extraScripts = '
  <script>
    function applyForLoan() {
      const user = window.authDB.getCurrentUser();
      if (!user) {
        openAuthModal("login");
        window.showToast("Please sign in to apply for pre-approved finance", "warning");
        return;
      }
      window.showToast("🎉 Loan pre-approval application submitted for " + user.name + "! Relationship manager will contact you.", "success");
    }
  </script>
';
require_once __DIR__ . '/includes/footer.php';
?>
