<?php

function loadAppConfig(): array
{
    static $config = null;

    if ($config !== null) {
        return $config;
    }

    $configPath = __DIR__ . '/../config.env';
    $config = [];

    if (file_exists($configPath) && is_readable($configPath)) {
        $parsedConfig = parse_ini_file($configPath);

        if (is_array($parsedConfig)) {
            $config = $parsedConfig;
        }
    }

    return $config;
}

function getAppEnv(string $key, $default = null)
{
    $value = getenv($key);

    if ($value !== false && $value !== '') {
        return $value;
    }

    $config = loadAppConfig();

    if (array_key_exists($key, $config) && $config[$key] !== '') {
        return $config[$key];
    }

    return $default;
}

function getDatabaseConfig(): array
{
    $databaseUrl = getenv('DATABASE_URL') ?: getenv('DB_URL') ?: getenv('MYSQL_URL');

    if ($databaseUrl) {
        $parsedUrl = parse_url($databaseUrl);

        return [
            'host' => $parsedUrl['host'] ?? getAppEnv('DB_HOST', '127.0.0.1'),
            'port' => $parsedUrl['port'] ?? getAppEnv('DB_PORT', '3306'),
            'dbname' => ltrim($parsedUrl['path'] ?? '/', '/') ?: getAppEnv('DB_NAME', ''),
            'user' => urldecode($parsedUrl['user'] ?? getAppEnv('DB_USER', '')),
            'password' => urldecode($parsedUrl['pass'] ?? getAppEnv('DB_PASS', '')),
        ];
    }

    return [
        'host' => getAppEnv('DB_HOST', '127.0.0.1'),
        'port' => getAppEnv('DB_PORT', '3306'),
        'dbname' => getAppEnv('DB_NAME', ''),
        'user' => getAppEnv('DB_USER', ''),
        'password' => getAppEnv('DB_PASS', ''),
    ];
}

function getAppDebugFlag(): bool
{
    return filter_var(getAppEnv('DEBUG', false), FILTER_VALIDATE_BOOLEAN);
}
