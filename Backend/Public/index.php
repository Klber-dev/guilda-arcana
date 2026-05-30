<?php

require_once __DIR__ . '/../Config/autoload.php';
require_once __DIR__ . '/../Config/headers.php';
require_once __DIR__ . '/../Config/database_config.php';

$connection = new Database(DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS);

session_start();