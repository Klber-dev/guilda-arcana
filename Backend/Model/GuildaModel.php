<?php

//require_once __DIR__ . '/../Config/autoload.php';

class GuildaModel {
    private $db;

    public function __construct(Database $database) {
        $this->db = $database->getDb(); //conexão com o banco aqui
    }

    public function create (Guilda $guilda) {
        $stmt = $this->db->prepare("INSERT INTO guildas (nome, dinheiro, espaco, reputacao, usuario_id) VALUES (:nome, :dinheiro, :espaco, :reputacao, :usuario_id)");
        $stmt->execute([
            ':nome' => $guilda->getNome(),
            ':dinheiro' => $guilda->getDinheiro(),
            ':espaco' => $guilda->getEspaco(),
            ':reputacao' => $guilda->getReputacao(),
            ':usuario_id' => $guilda->getUsuarioId()
        ]);

        $guilda->setId($this->db->lastInsertId()); //por algum motivo mágico ele funciona mesmo se acontecer duas inserções seguidas, porque o lastInsertId é específico pra cada conexão, zika
    }

    public function getById(int $id): ?Guilda {
        $stmt = $this->db->prepare("SELECT * FROM guildas WHERE id = :id");
        $stmt->execute([':id' => $id]);

        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($data) {
            return new Guilda($data['id'], $data['nome'], $data['dinheiro'], $data['espaco'], $data['reputacao'], $data['usuario_id']);
        } else {
            return null;
        }
    }

    public function update(Guilda $guilda){
        $stmt = $this->db->prepare("UPDATE guildas SET nome = :nome, dinheiro = :dinheiro, espaco = :espaco, reputacao = :reputacao, usuario_id = :usuario_id WHERE id = :id");
        $stmt->execute([
            ':nome' => $guilda->getNome(),
            ':dinheiro' => $guilda->getDinheiro(),
            ':espaco' => $guilda->getEspaco(),
            ':reputacao' => $guilda->getReputacao(),
            ':usuario_id' => $guilda->getUsuarioId(),
            ':id' => $guilda->getId()
        ]);
    }

    public function delete(int $id) {
        $stmt = $this->db->prepare("DELETE FROM guildas WHERE id = :id");
        $stmt->execute([':id' => $id]);
    }


    public function getByUsuarioId(int $usuario_id): ?Guilda {
        $stmt = $this->db->prepare("SELECT * FROM guildas WHERE usuario_id = :usuario_id");
        $stmt->execute([':usuario_id' => $usuario_id]); // basta dar um getId no usuario e passar o id dele aqui que ele vai retornar a guilda do usuario, ou null se o usuario não tiver guilda

        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($data) {
            return new Guilda($data['id'], $data['nome'], $data['dinheiro'], $data['espaco'], $data['reputacao'], $data['usuario_id']);
        } else {
            return null;
        }
    }

}


// $database = new Database("127.0.0.1", "3306", "guilda_arcana", "kleber", "root");

// $usuarioModel = new UsuarioModel($database);
// $usuario = $usuarioModel->getById(1);

// var_dump($usuario);
// echo "<br><hr>";

// $guildaModel = new GuildaModel($database);
// $guilda = new Guilda(null, "Galdérios", 100000, 10, 5, $usuario->getId());

// var_dump($guilda);
// echo "<br><hr>";   

// $guildaFromDb = $guildaModel->getByUsuarioId($usuario->getId());
// var_dump($guildaFromDb);