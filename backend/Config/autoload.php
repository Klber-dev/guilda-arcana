<?php

//Utiliza a spl_autoload_register para carregar automaticamente as classes quando elas forem usadas, sem a necessidade de usar require_once em cada arquivo. Ele procura as classes nas pastas Model, Controllers e Config.

spl_autoload_register(function ($class) {
    $pastas = [
        __DIR__ . '/../Model/',
        __DIR__ . '/../Controllers/',
        __DIR__ . '/../Config/'
    ];

    foreach ($pastas as $pasta) {
        $arquivo = $pasta . $class . '.php';

        if (file_exists($arquivo)) {
            require_once $arquivo;
            return;
        }
    }
});

//Aprendi isso com o Rafael Sandrigo e é mais uma conveniencia do que uma necessidade de fato, só abole o require_once 