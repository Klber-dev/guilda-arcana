
<?php
require_once "Database.php";

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

        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($data) {
            return new Usuario($data['id'], $data['nome'], $data['login'], $data['senha']);
        } else {
            return null;
        }
    }
}
