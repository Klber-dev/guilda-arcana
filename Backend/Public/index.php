<?php

require_once __DIR__ . '/../Config/headers.php';
require_once __DIR__ . '/../Config/autoload.php';
require_once __DIR__ . '/../Config/database_config.php';
session_start();


$db = new Database(DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS);

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