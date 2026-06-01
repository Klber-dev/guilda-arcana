<?php

//Garantindo que o back e o front se comuniquem bem
header("Content-Type: application/json; charset=UTF-8");

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");


//o navegador verifica se o servidor ( meu php ) tem os métodos de requisição tipo get, post e tals. Ai volta 200 pq é o "sim" dos servidores
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}