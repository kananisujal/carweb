<?php
/**
 * CARS24 - Authentication & Session API Endpoint (PHP)
 */
header('Content-Type: application/json; charset=UTF-8');
require_once __DIR__ . '/../includes/config.php';

$action = isset($_GET['action']) ? $_GET['action'] : '';

// 1. Get current session
if ($action === 'session') {
    if (isset($_SESSION['user'])) {
        echo json_encode(array(
            'status' => 'success',
            'authenticated' => true,
            'user' => $_SESSION['user']
        ));
    } else {
        echo json_encode(array(
            'status' => 'success',
            'authenticated' => false,
            'user' => null
        ));
    }
    exit;
}

// 2. Check Whitelist
if ($action === 'admins') {
    echo json_encode(array(
        'status' => 'success',
        'authorized_admins' => $AUTHORIZED_ADMIN_EMAILS
    ));
    exit;
}

// 3. Logout action
if ($action === 'logout') {
    unset($_SESSION['user']);
    session_destroy();
    echo json_encode(array(
        'status' => 'success',
        'message' => 'Logged out successfully'
    ));
    exit;
}

echo json_encode(array(
    'status' => 'error',
    'message' => 'Invalid action'
));
exit;
