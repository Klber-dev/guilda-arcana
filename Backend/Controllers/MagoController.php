<?php
// require_once __DIR__ . '/../Config/headers.php';
// require_once __DIR__ . '/../Config/autoload.php';
// require_once __DIR__ . '/../Config/database_config.php';
// session_start();

class MagoController extends BaseController {
    private $magoModel;
    private $guildaModel;

    public function __construct($database) {
        $this->magoModel = new MagoModel($database);
        $this->guildaModel = new GuildaModel($database);
    }

    public function criarMago(){
        $this->exigirLogin();
        $data = $this->getJsonInput();
    
        if(!isset($data['nome']) || !isset($data['nivel'])){
            $this->sendErrorResponse('Dados incompletos');
            return;
        }

        $guilda = $this->guildaModel->getByUsuarioId($this->getSessionID());
            if (!$guilda) {
                $this->sendErrorResponse('Guilda não encontrada');
                return;
            } 
        $mago = new Mago(null, $data['nome'], $data['nivel'], $guilda->getId());
        $this->magoModel->create($mago);
        $this->sendSuccessResponse('Mago criado com sucesso', $mago->toArray());
    }

    public function apagarMago(){
        $this->exigirLogin();
        $data = $this->getJsonInput();
        if(!isset($data['id'])){
            $this->sendErrorResponse('Dados incompletos');
            return;
        }

        $mago = $this->magoModel->getById($data['id']);
        if (!$mago) {
            $this->sendErrorResponse('Mago não encontrado');
            return;
        }
        
        $this->magoModel->delete($mago->getId());
        $this->sendSuccessResponse('Mago apagado com sucesso');
    }
}

//debug
// $db = new Database(DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS);
// $magoController = new MagoController($db);
// session_destroy();
// //$magoController->criarMago();
// $magoController->apagarMago();
