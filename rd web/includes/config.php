<?php
/**
 * CARS24 Web Application - Core Configuration & Helpers
 * Compatible with PHP 5.6+ and PHP 7/8
 */

// Initialize PHP Session safely if not already active
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Global Application Constants
define('APP_NAME', 'CARS24');
define('APP_TAGLINE', 'BETTER DRIVES');
define('APP_YEAR', '2026');
define('TOLL_FREE_PHONE', '1800-258-5656');
define('TOLL_FREE_TEL', '18002585656');

// Authorized Admin Email List
$AUTHORIZED_ADMIN_EMAILS = array(
    'sujal@gmail.com',
    'harsh@gmail.com',
    'paras@gmail.com'
);

/**
 * Returns 'active' CSS class if current page matches target
 *
 * @param string $targetPage
 * @param string $currentPage
 * @return string
 */
function isActivePage($targetPage, $currentPage) {
    return ($targetPage === $currentPage) ? 'active' : '';
}

/**
 * Format Indian Currency INR (e.g. 650000 -> 6.50 Lakh)
 *
 * @param float|int $amount
 * @return string
 */
function formatLakhs($amount) {
    if ($amount >= 10000000) {
        return '₹' . number_format($amount / 10000000, 2) . ' Crore';
    } elseif ($amount >= 100000) {
        return '₹' . number_format($amount / 100000, 2) . ' Lakh';
    }
    return '₹' . number_format($amount);
}

/**
 * Sanitize user input for safe output
 *
 * @param string $data
 * @return string
 */
function sanitizeInput($data) {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}
