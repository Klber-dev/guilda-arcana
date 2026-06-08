<?php

class BaseModel {
    protected $db;

    public function __construct(Database $database) {
        $this->db = $database->getDb();
    }

    protected function query(string $query, array $parametros = []){
        try {
            $stmt = $this->db->prepare($query);
            $stmt->execute($parametros);
            return $stmt;
        } catch (Exception $e) {
            http_response_code(500);

            if (DEBUG) {
                $resposta = [
                    'status' => 'error',
                    'message' => 'Ocorreu um erro no servidor.',
                    'error' => $e->getMessage()
                ];

                echo json_encode($resposta);
                exit;
            } else {
                $resposta = [
                    'status' => 'error',
                    'message' => 'Ocorreu um erro no servidor.'
                ];

                echo json_encode($resposta);
                exit;
            }
        }
    }
}