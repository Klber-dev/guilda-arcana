<?php
// header('Content-Type: application/json');
// require_once __DIR__ . '/../Config/autoload.php';
// require_once __DIR__ . '/../Config/database_config.php';

// session_start();

class UsuarioController extends BaseController
{
    private $usuarioModel;

    public function __construct(Database $database) {
        $this->usuarioModel = new UsuarioModel($database);
    }

    public function cadastrarUsuario()
    {
        $data = $this->getJsonInput();

        //verifica se os campos necessários foram enviados
        if(!isset($data['nome']) || !isset($data['login']) || !isset($data['senha'])){
            $this->sendErrorResponse('Dados incompletos');
            return;
        } 

        // Cria um novo objeto Usuario com os dados recebidos
        $usuario = new Usuario(null, $data['nome'], $data['login'], md5($data['senha']));
        

        // Verifica se o login já existe
        if ($this->usuarioModel->getByLogin($data['login'])){
            $this->sendErrorResponse('Login já existe');
            return;
        }

        // Salva o usuário no banco de dados
        $this->usuarioModel->create($usuario);
        $_SESSION['usuario_id'] = $usuario->getId(); // Armazena o ID do usuário na sessão
        $this->sendSuccessResponse('Usuário cadastrado com sucesso', $usuario->toArray());
    }

    public function autenticarUsuario()
    {
        $data = $this->getJsonInput();

        //verifica se chegou as informações
        if(!isset($data['login']) || !isset($data['senha'])){
            $this->sendErrorResponse('Dados incompletos');
            return;
        } 

        // Busca o usuário pelo login e verifica a senha
        $usuario = $this->usuarioModel->getByLogin($data['login']);
        if (!$usuario || $usuario->getSenha() !== md5($data['senha'])) {
            $this->sendErrorResponse('Login ou senha inválidos');
            return;
        }
        $_SESSION['usuario_id'] = $usuario->getId(); // Armazena o ID do usuário na sessão
        $this->sendSuccessResponse('Login bem sucedido', $usuario->toArray());
    }

    public function atualizarPerfil()
    {
        $usuarioLogado = $this->exigirLogin();
        $data = $this->getJsonInput();
        $usuario = $this->usuarioModel->getById($usuarioLogado);
        if (!$usuario) {
            $this->sendErrorResponse('Usuário não encontrado');
            return;
        }

        if (isset($data['nome'])) {
            $usuario->setNome($data['nome']);
        }
        if (isset($data['senha'])) {
            $usuario->setSenha(md5($data['senha']));
        }
        $this->usuarioModel->update($usuario);
        $this->sendSuccessResponse('Perfil atualizado com sucesso', $usuario->toArray());


    }

    public function excluirUsuario()
    {
        $usuarioLogado = $this->exigirLogin();
        $data = $this->getJsonInput();
        $usuario = $this->usuarioModel->getById($usuarioLogado);
        if (!$usuario) {
            $this->sendErrorResponse('Usuário não encontrado');
            return;
        }
        $this->usuarioModel->delete($usuarioLogado);
        $this->sendSuccessResponse('Usuário excluído com sucesso');

        unset($_SESSION['usuario_id']);
        session_destroy();
    }
}



//debug
// $db = new Database(DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS);
// $usuarioController = new UsuarioController($db);
// // $usuarioController->cadastrarUsuario();
//$usuarioController->autenticarUsuario();
// $usuarioController->atualizarPerfil();

// $_SESSION['usuario_id'] = 8;
// $usuarioController->excluirUsuario();



?>