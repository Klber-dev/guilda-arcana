<?php

// header('Content-Type: application/json');
// require_once __DIR__ . '/../Config/autoload.php';
// require_once __DIR__ . '/../Config/database_config.php';
// session_start();

class GuildaController extends BaseController {
    private $guildaModel;

    public function __construct(Database $database) {
        $this->guildaModel = new GuildaModel($database);
    }

    public function criarGuilda(){
        $usuarioLogado = $this->exigirLogin();
        $data = $this->getJsonInput();

        if(!isset($data['nome'])){
            $this->sendErrorResponse('Dados incompletos');
            return;
        }

        $guilda = new Guilda(null, $data['nome'], $usuarioLogado);

        $this->guildaModel->create($guilda);

        $this->sendSuccessResponse('Guilda criada com sucesso', $guilda->toArray());
    }

    public function getGuilda(){
        $usuarioLogado = $this->exigirLogin();
        $guilda = $this->guildaModel->getByUsuarioId($usuarioLogado);

        if (!$guilda) {
            $this->sendErrorResponse('Guilda não encontrada');
            return;
        }

        $this->sendJsonResponse($guilda->toArray());
    }

    public function atualizarGuilda(){
        $usuarioLogado = $this->exigirLogin();
        $data = $this->getJsonInput();
        $guilda = $this->guildaModel->getByUsuarioId($usuarioLogado);

        if (!$guilda) {
            $this->sendErrorResponse('Guilda não encontrada');
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

        $this->sendSuccessResponse('Guilda atualizada com sucesso', $guilda->toArray());
    }

    public function excluirGuilda(){
        $usuarioLogado = $this->exigirLogin();
        $guilda = $this->guildaModel->getByUsuarioId($usuarioLogado);

        if (!$guilda) {
            $this->sendErrorResponse('Guilda não encontrada');
            return;
        }

        $this->guildaModel->delete($guilda->getId());

        $this->sendSuccessResponse('Guilda excluída com sucesso');
    }

}


//debug
// $db = new Database(DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS);
// $guildaController = new GuildaController($db);
// $_SESSION['usuario_id'] = 7;

//$guildaController->criarGuilda();
//guildaController->atualizarGuilda();
//$guildaController->getGuilda();
//$guildaController->excluirGuilda();



?>