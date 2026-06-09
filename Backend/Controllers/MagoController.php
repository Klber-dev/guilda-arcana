<?php
// require_once __DIR__ . '/../Config/headers.php';
// require_once __DIR__ . '/../Config/autoload.php';
// require_once __DIR__ . '/../Config/database_config.php';
// session_start();

class MagoController extends BaseController
{
    private $magoModel;
    private $guildaModel;

    public function __construct($database)
    {
        $this->magoModel = new MagoModel($database);
        $this->guildaModel = new GuildaModel($database);
    }

    public function criarMago()
    {
        $usuarioLogado = $this->exigirLogin();
        $data = $this->getJsonInput();

        if (!isset($data['nome']) || !isset($data['nivel'])) {
            $this->sendErrorResponse('Dados incompletos');
            return;
        }

        $guilda = $this->guildaModel->getByUsuarioId($usuarioLogado);
        if (!$guilda) {
            $this->sendErrorResponse('Guilda não encontrada', 404);
            return;
        }

        if ($guilda->getEspaco() <= 0) {
            $this->sendErrorResponse('Sua guilda não tem espaço para mais magos', 409);
            return;
        }

        $mago = new Mago(null, $data['nome'], $data['nivel'], $guilda->getId());
        $guilda->setEspaco($guilda->getEspaco() - 1);
        $this->guildaModel->update($guilda);

        $this->magoModel->create($mago);
        $this->sendSuccessResponse('Mago criado com sucesso', $mago->toArray(), 201);
    }

    public function apagarMago()
    {
        $this->exigirLogin();
        $data = $this->getJsonInput();


        if (!isset($data['id'])) {
            $this->sendErrorResponse('Dados incompletos');
            return;
        }

        $usuarioLogado = $this->getSessionID();
        $guilda = $this->guildaModel->getByUsuarioId($usuarioLogado);
        $mago = $this->magoModel->getById($data['id']);

        if (!$mago || $mago->getGuildaId() !== $guilda->getId()) {
            $this->sendErrorResponse('Mago não encontrado ou não pertence à sua guilda', 404);
            return;
        }

        $this->magoModel->delete($data['id']);
        $guilda->setEspaco($guilda->getEspaco() + 1);
        $this->guildaModel->update($guilda);
        $this->sendSuccessResponse('Mago apagado com sucesso', null, 204);
    }

    public function getMagos()
    {
        $usuarioLogado = $this->getSessionID();
        $this->exigirLogin();
        $guilda = $this->guildaModel->getByUsuarioId($usuarioLogado);
        if (!$guilda) {
            $this->sendErrorResponse('Guilda não encontrada', 404);
            return;
        }
        $magos = $this->magoModel->getByGuildaId($guilda->getId());
        $magosArray = [];
        foreach ($magos as $mago) {
            $magosArray[] = $mago->toArray();
        }
        $this->sendJsonResponse($magosArray);
    }

    public function atualizarNivelMago()
    {
        $usuarioLogado = $this->exigirLogin();
        $data = $this->getJsonInput();

        if (!isset($data['id']) || !isset($data['nivel'])) {
            $this->sendErrorResponse('Dados incompletos');
            return;
        }

        $guilda = $this->guildaModel->getByUsuarioId($usuarioLogado);

        if (!$guilda) {
            $this->sendErrorResponse('Guilda não encontrada', 404);
            return;
        }

        $mago = $this->magoModel->getById((int) $data['id']);

        if (!$mago || $mago->getGuildaId() !== $guilda->getId()) {
            $this->sendErrorResponse('Mago não encontrado ou não pertence à sua guilda', 404);
            return;
        }

        $this->magoModel->updateNivel((int) $data['id'], (int) $data['nivel']);

        $this->sendSuccessResponse('Nível do mago atualizado com sucesso', null, 204);
    }
}

//debug
// $db = new Database(DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS);
// $magoController = new MagoController($db);
// $_SESSION['usuario_id'] = 1;
// $magoController->getMagos();
