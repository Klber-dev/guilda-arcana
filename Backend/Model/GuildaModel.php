<?php

// require_once __DIR__ . '/../Config/autoload.php';
// require_once __DIR__ . '/../Config/database_config.php';

class GuildaModel extends BaseModel {

    public function __construct(Database $database) {
        parent::__construct($database);
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
            return new Guilda($data['id'], $data['nome'], $data['usuario_id'], $data['dinheiro'], $data['espaco'], $data['reputacao']);
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
            return new Guilda($data['id'], $data['nome'], $data['usuario_id'], $data['dinheiro'], $data['espaco'], $data['reputacao']);
        } else {
            return null;
        }
    }

}




// $database = new Database(DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS);

// $usuarioModel = new UsuarioModel($database);
// $usuario = $usuarioModel->getById(7);

// var_dump($usuario);
// echo "<br><hr>";

// $guildaModel = new GuildaModel($database);
// $guilda = $guildaModel->getByUsuarioId($usuario->getId());
// var_dump($guilda);
// echo "<br><hr>";   

// echo json_encode($guilda->toArray());
