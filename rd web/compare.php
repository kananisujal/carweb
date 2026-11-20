<?php
/**
 * CARS24 - Vehicle Comparison Matrix
 * Built with PHP, JS, and CSS
 */
require_once __DIR__ . '/includes/config.php';

$pageTitle = 'Compare Cars Side by Side - Specs, Prices, Mileage & Safety | CARS24';
$currentPage = 'compare';

require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
?>

  <!-- Hero Header -->
  <section class="compare-header-hero">
    <div class="container">
      <h1>Compare Used Cars Side by Side</h1>
      <p>Analyze differences in pricing, performance, mileage, safety rating and feature lists to make the confident choice.</p>
    </div>
  </section>

  <!-- Main Comparison Content -->
  <main class="compare-container">
    <div class="container" id="compare-matrix-container">
      <!-- Dynamically rendered by js/app.js -->
    </div>
  </main>

<?php
require_once __DIR__ . '/includes/footer.php';
?>
