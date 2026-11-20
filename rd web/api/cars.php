<?php
/**
 * CARS24 - Cars Catalog API Endpoint (PHP)
 * Returns inventory in JSON format
 */
header('Content-Type: application/json; charset=UTF-8');
require_once __DIR__ . '/../includes/config.php';

// Sample inventory dataset for PHP backend
$cars = array(
    array(
        "id" => "c24-101",
        "brand" => "Hyundai",
        "model" => "Creta SX (O) 1.5 Petrol",
        "year" => 2021,
        "price" => 1285000,
        "km" => 28500,
        "fuel" => "Petrol",
        "transmission" => "Automatic",
        "bodyType" => "SUV",
        "city" => "Mumbai",
        "hub" => "Cars24 Hub - Andheri West, Mumbai",
        "rating" => 9.4,
        "sold" => false
    ),
    array(
        "id" => "c24-102",
        "brand" => "Maruti Suzuki",
        "model" => "Swift ZXi Plus AMT",
        "year" => 2022,
        "price" => 745000,
        "km" => 19200,
        "fuel" => "Petrol",
        "transmission" => "Automatic",
        "bodyType" => "Hatchback",
        "city" => "Delhi NCR",
        "hub" => "Cars24 Hub - Sector 29, Gurugram",
        "rating" => 9.2,
        "sold" => false
    ),
    array(
        "id" => "c24-103",
        "brand" => "Tata",
        "model" => "Nexon Fearless Plus S (Dark)",
        "year" => 2022,
        "price" => 1095000,
        "km" => 22400,
        "fuel" => "Diesel",
        "transmission" => "Manual",
        "bodyType" => "SUV",
        "city" => "Bengaluru",
        "hub" => "Cars24 Hub - Koramangala, Bengaluru",
        "rating" => 9.6,
        "sold" => false
    ),
    array(
        "id" => "c24-104",
        "brand" => "Honda",
        "model" => "City ZX CVT 1.5 i-VTEC",
        "year" => 2020,
        "price" => 1020000,
        "km" => 34000,
        "fuel" => "Petrol",
        "transmission" => "Automatic",
        "bodyType" => "Sedan",
        "city" => "Hyderabad",
        "hub" => "Cars24 Hub - Madhapur, Hyderabad",
        "rating" => 9.1,
        "sold" => false
    ),
    array(
        "id" => "c24-105",
        "brand" => "Mahindra",
        "model" => "XUV700 AX7 L Diesel AT AWD",
        "year" => 2022,
        "price" => 2150000,
        "km" => 26000,
        "fuel" => "Diesel",
        "transmission" => "Automatic",
        "bodyType" => "SUV",
        "city" => "Pune",
        "hub" => "Cars24 Hub - Baner, Pune",
        "rating" => 9.5,
        "sold" => false
    ),
    array(
        "id" => "c24-106",
        "brand" => "Kia",
        "model" => "Seltos GTX Plus 1.4 Turbo",
        "year" => 2021,
        "price" => 1360000,
        "km" => 31000,
        "fuel" => "Petrol",
        "transmission" => "Automatic",
        "bodyType" => "SUV",
        "city" => "Ahmedabad",
        "hub" => "Cars24 Hub - SG Highway, Ahmedabad",
        "rating" => 9.3,
        "sold" => false
    )
);

// Optional brand filter
if (isset($_GET['brand']) && !empty($_GET['brand'])) {
    $filterBrand = strtolower(trim($_GET['brand']));
    $cars = array_values(array_filter($cars, function($car) use ($filterBrand) {
        return strtolower($car['brand']) === $filterBrand;
    }));
}

// Optional body filter
if (isset($_GET['body']) && !empty($_GET['body'])) {
    $filterBody = strtolower(trim($_GET['body']));
    $cars = array_values(array_filter($cars, function($car) use ($filterBody) {
        return strtolower($car['bodyType']) === $filterBody;
    }));
}

echo json_encode(array(
    'status' => 'success',
    'count' => count($cars),
    'data' => $cars
));
exit;
