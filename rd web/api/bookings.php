<?php
/**
 * CARS24 - Bookings & Test Drive API (PHP)
 */
header('Content-Type: application/json; charset=UTF-8');
require_once __DIR__ . '/../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);

    if (!$data) {
        $data = $_POST;
    }

    $carId = isset($data['carId']) ? sanitizeInput($data['carId']) : '';
    $name = isset($data['name']) ? sanitizeInput($data['name']) : '';
    $phone = isset($data['phone']) ? sanitizeInput($data['phone']) : '';
    $date = isset($data['date']) ? sanitizeInput($data['date']) : date('Y-m-d');
    $time = isset($data['time']) ? sanitizeInput($data['time']) : '11:00 AM';

    if (empty($name) || empty($phone)) {
        echo json_encode(array(
            'status' => 'error',
            'message' => 'Name and contact phone are required.'
        ));
        exit;
    }

    $booking = array(
        'id' => 'bk-' . rand(1000, 9999),
        'carId' => $carId,
        'userName' => $name,
        'userPhone' => $phone,
        'date' => $date,
        'time' => $time,
        'status' => 'Confirmed',
        'createdAt' => date('Y-m-d H:i:s')
    );

    echo json_encode(array(
        'status' => 'success',
        'message' => 'Test drive booked successfully!',
        'booking' => $booking
    ));
    exit;
}

echo json_encode(array(
    'status' => 'error',
    'message' => 'Method not allowed'
));
exit;
