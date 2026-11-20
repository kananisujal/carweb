<?php
/**
 * CARS24 - Dedicated Administrator Security Gateway
 * Restricted strictly to Sujal, Harsh, Paras
 * Built with PHP, JS, and CSS
 */
require_once __DIR__ . '/includes/config.php';

$pageTitle = 'CARS24 Administrator Login - Authorized Staff Only';
$currentPage = 'admin-login';
$isAuthExempt = true; // Never blocked by mandatory auth gate

$extraHead = '
  <style>
    .admin-login-page {
      min-height: calc(100vh - 120px);
      background: radial-gradient(circle at 50% 20%, #152b47 0%, #07111e 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
    }
    .admin-login-card {
      background: #ffffff;
      border-radius: 20px;
      max-width: 520px;
      width: 100%;
      box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.15);
      overflow: hidden;
      animation: modalPopIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .admin-login-header {
      background: linear-gradient(135deg, #0b1a2d 0%, #173255 100%);
      color: white;
      padding: 32px 28px 24px;
      text-align: center;
      position: relative;
    }
    .admin-login-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(220, 38, 38, 0.2);
      border: 1px solid rgba(220, 38, 38, 0.5);
      color: #fca5a5;
      font-size: 0.74rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      padding: 4px 12px;
      border-radius: 20px;
      margin-bottom: 14px;
    }
    .admin-login-header h2 {
      font-size: 1.45rem;
      font-weight: 800;
      letter-spacing: -0.3px;
      color: #ffffff;
      margin-top: 8px;
    }
    .admin-login-header p {
      color: #94a3b8;
      font-size: 0.85rem;
      margin-top: 6px;
      line-height: 1.5;
    }
    .admin-login-body {
      padding: 28px 28px 32px;
    }
    .admin-alert {
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 0.86rem;
      margin-bottom: 18px;
      line-height: 1.45;
      display: none;
    }
    .admin-alert-error {
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #b91c1c;
      font-weight: 600;
    }
    .admin-alert-success {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      color: #15803d;
      font-weight: 600;
    }
    .admin-fast-fill-section {
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
    }
    .admin-fast-fill-title {
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: #64748b;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .admin-accounts-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .admin-account-btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 10px 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      text-align: left;
    }
    .admin-account-btn:hover {
      background: #eff6ff;
      border-color: #3b82f6;
      transform: translateY(-1px);
    }
    .admin-account-meta {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .admin-account-avatar {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: #1e3a8a;
      color: white;
      font-weight: 800;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .admin-account-name {
      font-size: 0.88rem;
      font-weight: 700;
      color: #0f172a;
    }
    .admin-account-email {
      font-size: 0.76rem;
      color: #64748b;
      font-family: monospace;
    }
    .admin-account-tag {
      font-size: 0.72rem;
      font-weight: 700;
      color: #2563eb;
      background: #dbeafe;
      padding: 3px 8px;
      border-radius: 6px;
    }
    .admin-security-note {
      margin-top: 20px;
      background: #fffbeb;
      border: 1px solid #fef3c7;
      border-radius: 8px;
      padding: 10px 12px;
      font-size: 0.75rem;
      color: #92400e;
      line-height: 1.45;
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }
    .admin-back-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 18px;
      color: #64748b;
      font-size: 0.84rem;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.2s;
    }
    .admin-back-link:hover {
      color: var(--primary);
    }
  </style>
';

require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
?>

  <!-- Admin Login Hero / Card Container -->
  <main class="admin-login-page">
    <div class="admin-login-card">
      <div class="admin-login-header">
        <div class="admin-login-badge">
          🛡️ AUTHORIZED PERSONNEL ONLY • HIGH SECURITY
        </div>
        <div class="brand-logo" style="justify-content: center; color: white; margin-bottom: 6px;">
          <span>CARS</span><span class="brand-badge">24</span>
        </div>
        <h2>Administrator Sign In</h2>
        <p>Log in with your authorized administrator ID and password to access the cars inventory, test drive bookings, and dealership controls.</p>
      </div>

      <div class="admin-login-body">
        <!-- Alert Messages -->
        <div id="admin-login-error" class="admin-alert admin-alert-error"></div>
        <div id="admin-login-success" class="admin-alert admin-alert-success"></div>

        <!-- Admin Login Form -->
        <form id="admin-login-form" onsubmit="handleAdminLoginSubmit(event)">
          <div class="form-group">
            <label class="form-label" for="admin-email">Admin Email Address</label>
            <input 
              type="email" 
              id="admin-email" 
              class="form-input" 
              placeholder="e.g. sujal@gmail.com" 
              autocomplete="email"
              required
            >
          </div>

          <div class="form-group">
            <label class="form-label" for="admin-password">Admin Password</label>
            <div style="position: relative;">
              <input 
                type="password" 
                id="admin-password" 
                class="form-input" 
                placeholder="Enter password (123456)" 
                autocomplete="current-password"
                required
              >
              <button 
                type="button" 
                onclick="togglePasswordVisibility()" 
                style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 0.85rem; color: #64748b;"
                id="toggle-pwd-btn"
              >
                👁️ Show
              </button>
            </div>
          </div>

          <button type="submit" class="btn-primary" style="width: 100%; padding: 13px; font-weight: 800; font-size: 0.96rem; margin-top: 8px;">
            Sign In to Administrator Console &rarr;
          </button>
        </form>

        <!-- Fast Fill for the 3 Authorized Admin Credentials -->
        <div class="admin-fast-fill-section">
          <div class="admin-fast-fill-title">
            <span>⚡ Authorized Admin Accounts (Click to Auto-Fill):</span>
          </div>
          <div class="admin-accounts-list">
            <!-- Admin 1: Sujal -->
            <button type="button" class="admin-account-btn" onclick="quickFillAdmin('sujal@gmail.com', '123456', 'Sujal Kanani')">
              <div class="admin-account-meta">
                <div class="admin-account-avatar" style="background:#ea580c;">S</div>
                <div>
                  <div class="admin-account-name">1) Sujal Kanani (Admin)</div>
                  <div class="admin-account-email">sujal@gmail.com • pass: 123456</div>
                </div>
              </div>
              <span class="admin-account-tag">Select &rarr;</span>
            </button>

            <!-- Admin 2: Harsh -->
            <button type="button" class="admin-account-btn" onclick="quickFillAdmin('harsh@gmail.com', '123456', 'Harsh')">
              <div class="admin-account-meta">
                <div class="admin-account-avatar" style="background:#2563eb;">H</div>
                <div>
                  <div class="admin-account-name">2) Harsh (Admin)</div>
                  <div class="admin-account-email">harsh@gmail.com • pass: 123456</div>
                </div>
              </div>
              <span class="admin-account-tag">Select &rarr;</span>
            </button>

            <!-- Admin 3: Paras -->
            <button type="button" class="admin-account-btn" onclick="quickFillAdmin('paras@gmail.com', '123456', 'Paras')">
              <div class="admin-account-meta">
                <div class="admin-account-avatar" style="background:#059669;">P</div>
                <div>
                  <div class="admin-account-name">3) Paras (Admin)</div>
                  <div class="admin-account-email">paras@gmail.com • pass: 123456</div>
                </div>
              </div>
              <span class="admin-account-tag">Select &rarr;</span>
            </button>
          </div>
        </div>

        <!-- Security Disclaimer -->
        <div class="admin-security-note">
          <span style="font-size: 1rem;">🔒</span>
          <div>
            <strong>Strict Security Restriction:</strong> Only these 3 authorized accounts (<strong>sujal@gmail.com</strong>, <strong>harsh@gmail.com</strong>, <strong>paras@gmail.com</strong>) have administrator privileges. All other email addresses are denied access.
          </div>
        </div>

        <div style="text-align: center; margin-top: 16px;">
          <a href="index.php" class="admin-back-link">
            &larr; Return to Customer Marketplace
          </a>
        </div>
      </div>
    </div>
  </main>

<?php
$extraScripts = '
  <script>
    // If already logged in as authorized admin, notify or offer one-click dashboard entry
    document.addEventListener("DOMContentLoaded", () => {
      // Remove any lingering lock
      document.documentElement.classList.remove("c24-auth-locked");
      document.body.style.overflow = "";

      if (window.authDB && window.authDB.isAdmin()) {
        const currentUser = window.authDB.getCurrentUser();
        const successAlert = document.getElementById("admin-login-success");
        if (successAlert && currentUser) {
          successAlert.style.display = "block";
          successAlert.innerHTML = `
            Currently logged in as <strong>${currentUser.name}</strong> (${currentUser.email}).<br>
            <div style="margin-top: 8px;">
              <a href="admin.php" class="btn-primary" style="display: inline-block; padding: 6px 14px; font-size: 0.82rem; text-decoration: none;">
                Proceed to Admin Dashboard &rarr;
              </a>
            </div>
          `;
        }
      }
    });

    function togglePasswordVisibility() {
      const pwdInput = document.getElementById("admin-password");
      const btn = document.getElementById("toggle-pwd-btn");
      if (pwdInput.type === "password") {
        pwdInput.type = "text";
        btn.textContent = "🙈 Hide";
      } else {
        pwdInput.type = "password";
        btn.textContent = "👁️ Show";
      }
    }

    function quickFillAdmin(email, pass, name) {
      document.getElementById("admin-email").value = email;
      document.getElementById("admin-password").value = pass;
      const errorAlert = document.getElementById("admin-login-error");
      if (errorAlert) errorAlert.style.display = "none";
      if (window.showToast) {
        window.showToast("Selected " + name + " credentials (" + email + ")", "info");
      }
    }

    function handleAdminLoginSubmit(e) {
      e.preventDefault();
      const email = document.getElementById("admin-email").value;
      const pass = document.getElementById("admin-password").value;
      const errorAlert = document.getElementById("admin-login-error");
      const successAlert = document.getElementById("admin-login-success");

      errorAlert.style.display = "none";
      successAlert.style.display = "none";

      const res = window.authDB.loginAdmin(email, pass);
      if (res.success) {
        successAlert.style.display = "block";
        successAlert.innerHTML = "✅ Authentication successful! Welcome, <strong>" + res.user.name + "</strong>. Redirecting to Admin Dashboard...";
        if (window.showToast) {
          window.showToast("Admin signed in: " + res.user.name, "success");
        }
        setTimeout(() => {
          window.location.href = "admin.php";
        }, 600);
      } else {
        errorAlert.style.display = "block";
        errorAlert.textContent = res.message;
        if (window.showToast) {
          window.showToast(res.message, "error");
        }
      }
    }
  </script>
';
require_once __DIR__ . '/includes/footer.php';
?>
