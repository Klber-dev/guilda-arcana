<?php
// header('Content-Type: application/json');
// require_once __DIR__ . '/../Config/autoload.php';
// require_once __DIR__ . '/../Config/database_config.php';

// session_start();

class UsuarioController
{
    private $usuarioModel;

    public function __construct(Database $database) {
        $this->usuarioModel = new UsuarioModel($database);
    }


    private function getJsonInput(){
        //pega a entrada JSON e decodifica para um array associativo, se não tiver nada retorna um array vazio
        return json_decode(file_get_contents('php://input'), true) ?? [];
    }

    public function cadastrarUsuario()
    {
        $data = $this->getJsonInput();
        if(!isset($data['nome']) || !isset($data['login']) || !isset($data['senha'])){
            echo json_encode(['error' => 'Dados incompletos']);
            return;
        }

        $usuario = new Usuario(null, $data['nome'], $data['login'], md5($data['senha']));
        
        if ($this->usuarioModel->getByLogin($data['login'])){
            echo json_encode(['error' => 'Login já existe']);
            return;
        }

        $this->usuarioModel->create($usuario);
        $_SESSION['usuario_id'] = $usuario->getId(); // Armazena o ID do usuário na sessão
        echo json_encode([
            'message' => 'Usuário cadastrado com sucesso',
            'usuario' => $usuario->toArray() 
        ]);
    }

    public function autenticarUsuario()
    {
        $data = $this->getJsonInput();
        if(!isset($data['login']) || !isset($data['senha'])){
            echo json_encode(['error' => 'Dados incompletos']);
            return;
        }

        $usuario = $this->usuarioModel->getByLogin($data['login']);
        if (!$usuario || $usuario->getSenha() !== md5($data['senha'])) {
            echo json_encode(['error' => 'Login ou senha inválidos']);
            return;
        }
        $_SESSION['usuario_id'] = $usuario->getId(); // Armazena o ID do usuário na sessão
        echo json_encode(['message' => 'Login bem sucedido', 'usuario' => $usuario->toArray()]);
    }

    public function atualizarPerfil()
    {
        $data = $this->getJsonInput();
        $usuario = $this->usuarioModel->getById($_SESSION['usuario_id']);
        if (!$usuario) {
            echo json_encode(['error' => 'Usuário não encontrado']);
            return;
        }

        if (isset($data['nome'])) {
            $usuario->setNome($data['nome']);
        }
        if (isset($data['senha'])) {
            $usuario->setSenha(md5($data['senha']));
        }
        $this->usuarioModel->update($usuario);
        echo json_encode(['message' => 'Perfil atualizado com sucesso', 'usuario' => $usuario->toArray()]);


    }

    public function excluirUsuario()
    {
        $data = $this->getJsonInput();
        $usuario = $this->usuarioModel->getById($_SESSION['usuario_id']);
        if (!$usuario) {
            echo json_encode(['error' => 'Usuário não encontrado']);
            return;
        }
        $this->usuarioModel->delete($_SESSION['usuario_id']);
        echo json_encode(['message' => 'Usuário excluído com sucesso']);

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