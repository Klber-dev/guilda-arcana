<?php

require_once __DIR__ . '/env.php';

$allowedOrigin = getAppEnv('FRONTEND_URL', getAppEnv('CORS_ORIGIN', 'http://localhost:5173'));

header("Access-Control-Allow-Origin: $allowedOrigin");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Vary: Origin");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}