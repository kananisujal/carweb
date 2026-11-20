<?php
/**
 * CARS24 - Shared Header Template
 */
if (!defined('APP_NAME')) {
    require_once __DIR__ . '/config.php';
}

if (!isset($pageTitle)) {
    $pageTitle = 'CARS24 - Buy Brand New & Certified Used Cars | 2026 Launches';
}
if (!isset($currentPage)) {
    $currentPage = 'home';
}
if (!isset($isAuthExempt)) {
    $isAuthExempt = false;
}
if (!isset($isAdminOnly)) {
    $isAdminOnly = false;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8'); ?></title>
  
  <!-- Favicon & Brand Icons -->
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚗</text></svg>">
  
  <!-- Google Fonts: Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  
  <!-- Main Application CSS -->
  <link rel="stylesheet" href="css/style.css">

  <?php if ($isAdminOnly): ?>
  <!-- Pre-render Authentication Guard: Strictly restricts access to the 3 Authorized Admins -->
  <script>
    (function() {
      try {
        var sess = localStorage.getItem('cars24_current_user_v1');
        var allowed = ['sujal@gmail.com', 'harsh@gmail.com', 'paras@gmail.com'];
        if (!sess) {
          window.location.replace('admin-login.php');
          return;
        }
        var user = JSON.parse(sess);
        if (!user || user.role !== 'admin' || !allowed.includes((user.email || '').toLowerCase())) {
          window.location.replace('admin-login.php');
        }
      } catch(e) {
        window.location.replace('admin-login.php');
      }
    })();
  </script>
  <?php elseif ($isAuthExempt): ?>
  <!-- Ensure page is never blocked by mandatory gate -->
  <script>
    document.documentElement.classList.remove('c24-auth-locked');
  </script>
  <?php else: ?>
  <!-- Pre-render Authentication Guard: Strictly blocks website until logged in or registered -->
  <script>
    (function() {
      try {
        var sess = localStorage.getItem('cars24_current_user_v1');
        if (!sess || !JSON.parse(sess)) {
          document.documentElement.classList.add('c24-auth-locked');
        }
      } catch(e) {
        document.documentElement.classList.add('c24-auth-locked');
      }
    })();
  </script>
  <?php endif; ?>

  <?php if (isset($extraHead)) echo $extraHead; ?>
</head>
<body>
