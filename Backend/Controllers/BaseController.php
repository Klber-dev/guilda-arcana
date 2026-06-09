<?php

class BaseController {

    protected function getJsonInput(): array {
        return json_decode(file_get_contents('php://input'), true) ?? [];
    }

    protected function sendJsonResponse(array $data, int $httpCode = 200): void {
        http_response_code($httpCode);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    protected function sendErrorResponse(
        string $message,
        int $httpCode = 400,
        string $type = 'error',
        mixed $debug = null
        //never é um tipo de retorno que indica que a função não retorna nada e que o script deve ser encerrado após a chamada dessa função
    ): never {
        $response = [
            'status' => 'error',
            'type' => $type,
            'message' => $message
        ];

        if (defined('DEBUG') && DEBUG && $debug !== null) {
            $response['debug'] = $debug;
        }

        $this->sendJsonResponse($response, $httpCode);
        exit;
    }

    protected function sendSuccessResponse(
        string $message,
        ?array $data = [],
        int $httpCode = 200
    ): void {
        $response = [
            'status' => 'success',
            'message' => $message
        ];

        if (!empty($data)) {
            $response['data'] = $data;
        }

        $this->sendJsonResponse($response, $httpCode);
    }

    protected function getSessionID(): ?int {
        return $_SESSION['usuario_id'] ?? null;
    }

    protected function exigirLogin(): int {
        $usuarioLogado = $this->getSessionID();

        if (!$usuarioLogado) {
            $this->sendErrorResponse(
                'Acesso negado. Faça login para continuar.',
                401,
                'auth'
            );
        }

        return $usuarioLogado;
    }
}