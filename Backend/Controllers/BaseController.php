<?php

class BaseController {
    
    protected function getJsonInput() {
        return json_decode(file_get_contents('php://input'), true) ?? [];
    }

    protected function sendJsonResponse($data) {
        echo json_encode($data);
    }

    protected function sendErrorResponse($message) {
        $this->sendJsonResponse(['error' => $message]);
    }

    protected function sendSuccessResponse($message, $data = []) {
        $response = ['message' => $message];
        if (!empty($data)) {
            $response['data'] = $data;
        }
        $this->sendJsonResponse($response);
    }

    protected function getSessionID() {
        return $_SESSION['usuario_id'] ?? null;
    }

    protected function exigirLogin(){
        $usuarioLogado = $this->getSessionID();
        if (!$usuarioLogado) {
            $this->sendErrorResponse('Acesso negado. Faça login para continuar.');
            exit;
        }

        return $usuarioLogado;
    }
}