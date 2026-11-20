<?php
/**
 * CARS24 - Shared Footer Component
 */
if (!defined('APP_NAME')) {
    require_once __DIR__ . '/config.php';
}
?>

<!-- Footer -->
<footer class="c24-footer">
  <div class="container">
    <div class="footer-grid">
      <!-- Brand Column -->
      <div class="footer-brand">
        <div class="brand-logo" style="color: white;">
          <span>CARS</span><span class="brand-badge">24</span>
        </div>
        <p>
          CARS24 is India's leading technology-driven platform for certified pre-owned and brand-new cars. Buy quality checked cars with 7-day money back guarantee and instant paperless loans.
        </p>
        <div style="display: flex; gap: 12px; font-size: 1.2rem;">
          <span>📘</span> <span>🐦</span> <span>📸</span> <span>▶️</span> <span>💼</span>
        </div>
      </div>

      <!-- Explore Cars -->
      <div class="footer-col">
        <h4>Explore Cars</h4>
        <ul class="footer-links">
          <li><a href="index.php">Buy Used SUVs</a></li>
          <li><a href="index.php">Buy Used Hatchbacks</a></li>
          <li><a href="index.php">Buy Used Sedans</a></li>
          <li><a href="new-cars.php">Buy Brand New 2026 Cars</a></li>
          <li><a href="compare.php">Compare Car Models</a></li>
          <li><a href="emi.php">Used Car EMI Calculator</a></li>
        </ul>
      </div>

      <!-- Services & Finance -->
      <div class="footer-col">
        <h4>Services & Finance</h4>
        <ul class="footer-links">
          <li><a href="sell.php">Instant Car Valuation</a></li>
          <li><a href="emi.php">Car Loan Interest Rates</a></li>
          <li><a href="javascript:void(0)" onclick="openTestDriveModal('c24-101')">Doorstep Test Drive</a></li>
          <li><a href="index.php">140 Checkpoint Inspection</a></li>
          <li><a href="admin-login.php">Admin Operations Portal</a></li>
        </ul>
      </div>

      <!-- Customer Demo & Admin -->
      <div class="footer-col">
        <h4>Customer Demo & Admin</h4>
        <p style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 12px;">Instant login & admin gateway:</p>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <button class="btn-outline-white" style="font-size: 0.8rem; padding: 6px 12px; text-align: left;" onclick="openAuthModal('login'); fillDemoCredentials('user');">
            👤 Sign in as Buyer
          </button>
          <a href="admin-login.php" class="btn-outline-white" style="font-size: 0.8rem; padding: 6px 12px; text-align: left; text-decoration: none; display: flex; align-items: center; justify-content: space-between;">
            <span>🛡️ Admin Login Portal</span>
            <span>&rarr;</span>
          </a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div>&copy; <?php echo APP_YEAR; ?> CARS24 Web Application. Powered by PHP, Vanilla JavaScript, and CSS.</div>
      <div style="display: flex; gap: 20px;">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Security</a>
      </div>
    </div>
  </div>
</footer>

<!-- Core Application Scripts -->
<script src="js/cars-data.js"></script>
<script src="js/auth.js"></script>
<script src="js/app.js"></script>

<?php if (isset($extraScripts)) echo $extraScripts; ?>
</body>
</html>
