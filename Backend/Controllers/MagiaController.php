<?php 

// require_once '../Config/autoload.php';
// require_once '../Config/database_config.php';
// require_once '../Config/headers.php';
// session_start();

class MagiaController extends BaseController {
    private $magiaModel;

    public function __construct($database) {
        $this->magiaModel = new MagiaModel($database);
    }

    public function salvarMagia(){
        $data = $this->getJsonInput();
        if(!isset($data['nome']) || !isset($data['nivel'])){
            $this->sendErrorResponse('Dados incompletos');
            return;
        }
        if ($this->magiaModel->getByName($data['nome'])) {
            $this->sendErrorResponse('Magia com esse nome já existe');
            return;
        }

        $magia = new Magia(null, $data['nome'], $data['nivel']);
        $this->magiaModel->create($magia);
        $this->sendSuccessResponse('Magia criada com sucesso', $magia->toArray());
    }

    public function listarMagias(){
        $magias = $this->magiaModel->getAll();
        $magiasArray = [];
        foreach ($magias as $magia) {
            $magiasArray[] = $magia->toArray();
        }
        $this->sendJsonResponse($magiasArray);
    }

    public function getByName(){
        $data = $this->getJsonInput();
        if(!isset($data['nome'])){
            $this->sendErrorResponse('Dados incompletos');
            return;
        }
        $magia = $this->magiaModel->getByName($data['nome']);
        if (!$magia) {
            $this->sendErrorResponse('Magia não encontrada');
            return;
        }
        $this->sendJsonResponse($magia->toArray());
    }
}

//debug
// $db = new Database(DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS);
// $magiaController = new MagiaController($db);
// $magiaController->listarMagias();
//$magiaController->salvarMagia();
// $magiaController->getByName();
?>