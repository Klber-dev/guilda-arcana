<?php
// require_once '../Config/autoload.php';
// require_once '../Config/database_config.php';
// require_once '../Config/headers.php';
// session_start();

class MagoMagiaController extends BaseController
{
    private $magoModel;
    private $magiaModel;
    private $magoMagiaModel;
    private $guildaModel;

    public function __construct($database)
    {
        $this->magoModel = new MagoModel($database);
        $this->magiaModel = new MagiaModel($database);
        $this->magoMagiaModel = new MagoMagiaModel($database);
        $this->guildaModel = new GuildaModel($database);
    }

    public function aprenderMagia()
    {
        $usuarioLogado = $this->exigirLogin();
        $data = $this->getJsonInput();

        if (
            !isset($data['mago_id']) ||
            !isset($data['magia_index']) ||
            !isset($data['nivel_minimo'])
        ) {
            $this->sendErrorResponse('Dados incompletos');
            return;
        }

        $guilda = $this->guildaModel->getByUsuarioId($usuarioLogado);

        if (!$guilda) {
            $this->sendErrorResponse('Guilda não encontrada', 404);
            return;
        }

        $mago = $this->magoModel->getById((int) $data['mago_id']);

        if (!$mago || $mago->getGuildaId() !== $guilda->getId()) {
            $this->sendErrorResponse('Mago não encontrado ou não pertence à sua guilda', 404);
            return;
        }

        $magia = $this->magiaModel->getByName($data['magia_index']);

        if (!$magia) {
            $magia = new Magia(
                null,
                $data['magia_index'],
                (int) $data['nivel_minimo']
            );

            $this->magiaModel->create($magia);
        }

        if ($mago->getNivel() < $magia->getNivelMinimo()) {
            $this->sendErrorResponse('Mago não tem nível suficiente para aprender essa magia', 403);
            return;
        }

        $magoMagiaExistente = $this->magoMagiaModel->getRelacao(
            $mago->getId(),
            $magia->getId()
        );

        if ($magoMagiaExistente) {
            $this->sendErrorResponse('Mago já aprendeu essa magia', 409);
            return;
        }

        $magoMagia = new MagoMagia(
            $mago->getId(),
            $magia->getId()
        );

        $this->magoMagiaModel->create($magoMagia);

        $this->sendSuccessResponse('Magia aprendida com sucesso', null, 201);
    }

    public function desaprenderMagia()
    {
        $usuarioLogado = $this->exigirLogin();
        $data = $this->getJsonInput();

        if (!isset($data['mago_id']) || !isset($data['magia_id'])) {
            $this->sendErrorResponse('Dados incompletos');
            return;
        }

        $guilda = $this->guildaModel->getByUsuarioId($usuarioLogado);
        $mago = $this->magoModel->getById($data['mago_id']);
        $magia = $this->magiaModel->getById($data['magia_id']);

        if (!$mago || !$magia || $mago->getGuildaId() !== $guilda->getId()) {
            $this->sendErrorResponse('Mago ou magia não encontrados, ou mago não pertence à sua guilda', 404);
            return;
        }

        $magoMagia = $this->magoMagiaModel->getRelacao($data['mago_id'], $data['magia_id']);
        if (!$magoMagia) {
            $this->sendErrorResponse('Mago não aprendeu essa magia', 404);
            return;
        }

        $this->magoMagiaModel->delete($data['mago_id'], $data['magia_id']);
        $this->sendSuccessResponse('Magia desaprendida com sucesso', null, 204);
    }

    public function listarMagiasdoMago()
    {
        $usuarioLogado = $this->exigirLogin();
        $data = $this->getJsonInput();

        if (!isset($data['mago_id'])) {
            $this->sendErrorResponse('Dados incompletos');
            return;
        }

        $guilda = $this->guildaModel->getByUsuarioId($usuarioLogado);
        $mago = $this->magoModel->getById($data['mago_id']);

        if (!$mago || $mago->getGuildaId() !== $guilda->getId()) {
            $this->sendErrorResponse('Mago não encontrado ou não pertence à sua guilda', 404);
            return;
        }

        $magias = $this->magoMagiaModel->getMagiasdoMago($data['mago_id']);
        $magiasArray = [];
        foreach ($magias as $magia) {
            $magiasArray[] = $magia->toArray();
        }

        $this->sendSuccessResponse('Magias do mago listadas com sucesso', $magiasArray, 200);
    }
}

//debug
// $db = new Database(DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS);
// $magoMagiaController = new MagoMagiaController($db);
// $magoMagiaController->aprenderMagia();
// $magoMagiaController->desaprenderMagia();
// $magoMagiaController->listarMagiasdoMago();