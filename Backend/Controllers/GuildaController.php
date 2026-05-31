<?php

header('Content-Type: application/json');
require_once __DIR__ . '/../Config/autoload.php';
require_once __DIR__ . '/../Config/database_config.php';
session_start();

class GuildaController {
    private $guildaModel;

    public function __construct(Database $database) {
        $this->guildaModel = new GuildaModel($database);
    }

    public function getJsonInput() {
        return json_decode(file_get_contents('php://input'), true) ?? [];
    }

    public function criarGuilda(){
        $data = $this->getJsonInput();

        if(!isset($data['nome'])){
            echo json_encode(['error' => 'Dados incompletos']);
            return;
        }

        $guilda = new Guilda(null, $data['nome'], $_SESSION['usuario_id']);
        $this->guildaModel->create($guilda);

        echo json_encode([
            'message' => 'Guilda criada com sucesso',
            'guilda' => $guilda->toArray()
        ]);
    }

    public function getGuilda(){
        $guilda = $this->guildaModel->getByUsuarioId($_SESSION['usuario_id']);

        if (!$guilda) {
            echo json_encode(['error' => 'Guilda não encontrada']);
            return;
        }

        echo json_encode($guilda->toArray());
    }

    public function atualizarGuilda(){
        $data = $this->getJsonInput();
        $guilda = $this->guildaModel->getByUsuarioId($_SESSION['usuario_id']);

        if (!$guilda) {
            echo json_encode(['error' => 'Guilda não encontrada']);
            return;
        }

        if (isset($data['nome'])) {
            $guilda->setNome($data['nome']);
        }
        if (isset($data['dinheiro'])) {
            $guilda->setDinheiro($data['dinheiro']);
        }
        if (isset($data['espaco'])) {
            $guilda->setEspaco($data['espaco']);
        }
        if (isset($data['reputacao'])) {
            $guilda->setReputacao($data['reputacao']);
        }

        $this->guildaModel->update($guilda);

        echo json_encode([
            'message' => 'Guilda atualizada com sucesso',
            'guilda' => $guilda->toArray()
        ]);
    }

    public function excluirGuilda(){
        $guilda = $this->guildaModel->getByUsuarioId($_SESSION['usuario_id']);

        if (!$guilda) {
            echo json_encode(['error' => 'Guilda não encontrada']);
            return;
        }

        $this->guildaModel->delete($guilda->getId());

        echo json_encode(['message' => 'Guilda excluída com sucesso']);
    }

}


?>