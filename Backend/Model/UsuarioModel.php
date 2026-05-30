
<?php
//require_once "../Database.php";
// require_once "../Usuario.php";

class UsuarioModel {
    private $db;

    public function __construct(Database $database) {
        $this->db = $database->getDb();
    }


    //Aqui eu passo um objeto usuario como parametro pra dessa forma eu conseguir pegar os dados do usuario
    public function create (Usuario $usuario) {
        $stmt = $this->db->prepare("INSERT INTO usuarios (nome, login, senha) VALUES (:nome, :login, :senha)");
        $stmt->execute([
            ':nome' => $usuario->getNome(),
            ':login' => $usuario->getLogin(),
            ':senha' => $usuario->getSenha()
        ]);


        //Método do PDO que pega o último ID que foi inserido no banco via AUTO INCREMENT, usando o setter pra colocar no usuário
        $usuario->setId($this->db->lastInsertId());
    }


    //Metodo para buscar um usuario pelo id, retornando um objeto usuario ou null caso não encontre
    //A ideia do método é: pegar o id da session pós login, e ai, pegar de novo os dados do usuário pra seguir nas outras páginas
    public function getById(int $id): ?Usuario {
        $stmt = $this->db->prepare("SELECT * FROM usuarios WHERE id = :id");
        $stmt->execute([':id' => $id]);

        //ao invés de criar um array associativo e usar os indices pra instanciar um objeto, esse método já instância automaticamente, sendo o unico requisito que os atributos sejam os mesmos que os da tabela do SQL
        //Só que não deu certo por conta do construct da classe Usuario, que tem parametros obrigatórios, e o fetchObject não tem como passar os parametros pro construct, por isso, tive que usar o fetch associativo e ai instanciar manualmente o objeto
        // return $usuario = $stmt->fetchObject("Usuario");
        
        //FETCH_ASSOC retorna um array associativo, onde os indices são os nomes das colunas no banco. 
        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($data) {
            return new Usuario($data['id'], $data['nome'], $data['login'], $data['senha']);
        } else {
            return null;
        }
    }

    public function update(Usuario $usuario){
        $stmt = $this->db->prepare("UPDATE usuarios SET nome = :nome, login = :login, senha = :senha WHERE id = :id");
        $stmt->execute([
            ':nome' => $usuario->getNome(),
            ':login' => $usuario->getLogin(),
            ':senha' => $usuario->getSenha(),
        ]);
        
    }

    public function getByLogin(string $login): ?Usuario {
        $stmt = $this->db->prepare("SELECT * FROM usuarios WHERE login = :login");
        $stmt->execute([':login' => $login]);


        
        // return $usuario = $stmt->fetchObject("Usuario");
        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($data) {
            return new Usuario($data['id'], $data['nome'], $data['login'], $data['senha']);
        } else {
            return null;
        }
    }

    public function delete(int $id) {
        $stmt = $this->db->prepare("DELETE FROM usuarios WHERE id = :id");
        $stmt->execute([':id' => $id]);
    }

}

// $database = new Database("127.0.0.1", "3306", "guilda_arcana", "kleber", "root");

// $usuario = new Usuario(null, "Rafael", "rafael_santripa", "rafa#anoquenasci");

// $model = new UsuarioModel($database);
// $usuario = $model->getByLogin("kleber");
// $senha = 123456; 

// if($usuario->getLogin() == "kleber" && $usuario->getSenha() == $senha){
//     echo "usuario autentico";
// }else{
//     echo "Usuario não autentico";
// }
// $model->create($usuario);

// $usuarioDB = $model->getById(5);
// var_dump($usuarioDB);


