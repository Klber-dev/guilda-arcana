<?php

require_once __DIR__ . '/../Config/headers.php';
require_once __DIR__ . '/../Config/autoload.php';
session_start();

//transforma as informações em um array associativo
$config = parse_ini_file(__DIR__ . "/../config.env");

$host = $config["DB_HOST"];
$port = $config["DB_PORT"];
$dbname = $config["DB_NAME"];
$user = $config["DB_USER"];
$password = $config["DB_PASS"];

define("DEBUG", filter_var($config["DEBUG"] ?? false, FILTER_VALIDATE_BOOLEAN));

$db = new Database($host, $port, $dbname, $user, $password);

$rota = $_GET['rota'] ?? '';
$acao = $_GET['acao'] ?? '';

switch ($rota) {
    case 'usuarios':
        $controller = new UsuarioController($db);

        if ($acao === 'cadastrar') {
            $controller->cadastrarUsuario();
        } elseif ($acao === 'login') {
            $controller->autenticarUsuario();
        } elseif ($acao === 'atualizar') {
            $controller->atualizarPerfil();
        } elseif ($acao === 'excluir') {
            $controller->excluirUsuario();
        } elseif ($acao === 'logout') {
            $controller->logout();
        }
        break;

    case 'guildas':
        $controller = new GuildaController($db);

        if ($acao === 'criar') {
            $controller->criarGuilda();
        } elseif ($acao === 'buscar') {
            $controller->getGuilda();
        } elseif ($acao === 'atualizar') {
            $controller->atualizarGuilda();
        } elseif ($acao === 'excluir') {
            $controller->excluirGuilda();
        }
        break;

    case 'magos':
        $controller = new MagoController($db);

        if ($acao === 'criar') {
            $controller->criarMago();
        } elseif ($acao === 'listar') {
            $controller->getMagos();
        } elseif ($acao === 'apagar') {
            $controller->apagarMago();
        } elseif ($acao === 'atualizarNivel') {
            $controller->atualizarNivelMago();
        }
        break;

    case 'mago-magias':
        $controller = new MagoMagiaController($db);

        if ($acao === 'aprender') {
            $controller->aprenderMagia();
        } elseif ($acao === 'desaprender') {
            $controller->desaprenderMagia();
        } elseif ($acao === 'listar') {
            $controller->listarMagiasdoMago();
        }
        break;

    default:
        echo json_encode(['error' => 'Rota não encontrada']);
}
