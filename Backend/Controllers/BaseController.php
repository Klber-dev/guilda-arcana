<?php

class BaseController {
    
    public function getJsonInput() {
        return json_decode(file_get_contents('php://input'), true) ?? [];
    }

    public function sendJsonResponse($data) {
        echo json_encode($data);
    }

    public function sendErrorResponse($message) {
        $this->sendJsonResponse(['error' => $message]);
    }

    public function sendSuccessResponse($message, $data = []) {
        $response = ['message' => $message];
        if (!empty($data)) {
            $response['data'] = $data;
        }
        $this->sendJsonResponse($response);
    }

    public function getSessionID() {
        return $_SESSION['usuario_id'] ?? null;
    }

    public function exigirLogin(){
        $usuarioLogado = $this->getSessionID();
        if (!$usuarioLogado) {
            $this->sendErrorResponse('Acesso negado. Faça login para continuar.');
        }

        return $usuarioLogado;
    }
}