<?php

require_once __DIR__ . '/env.php';

$databaseConfig = getDatabaseConfig();

if (!defined('DB_HOST')) {
    define('DB_HOST', $databaseConfig['host']);
}
if (!defined('DB_PORT')) {
    define('DB_PORT', $databaseConfig['port']);
}
if (!defined('DB_NAME')) {
    define('DB_NAME', $databaseConfig['dbname']);
}
if (!defined('DB_USER')) {
    define('DB_USER', $databaseConfig['user']);
}
if (!defined('DB_PASS')) {
    define('DB_PASS', $databaseConfig['password']);
}

