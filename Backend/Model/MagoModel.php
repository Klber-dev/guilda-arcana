<?php

require_once __DIR__ . '/../Config/autoload.php';

class MagoModel{
    private $db;

    public function __construct(Database $database) {
        $this->db = $database->getDb(); //conexão com o banco aqui
    }

    public function create (Mago $mago) {
        $stmt = $this->db->prepare("INSERT INTO magos (nome, nivel, guilda_id) VALUES (:nome, :nivel, :guilda_id)");
        $stmt->execute([
            ':nome' => $mago->getNome(),
            ':nivel' => $mago->getNivel(),
            ':guilda_id' => $mago->getGuildaId()
        ]);

        $mago->setId($this->db->lastInsertId()); 
    }

    public function getById(int $id): ?Mago {
        $stmt = $this->db->prepare("SELECT * FROM magos WHERE id = :id");
        $stmt->execute([':id' => $id]);

        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($data) {
            return new Mago($data['id'], $data['nome'], $data['nivel'], $data['guilda_id']);
        } else {
            return null;
        }
    }

    public function update(Mago $mago){
        $stmt = $this->db->prepare("UPDATE magos SET nome = :nome, nivel = :nivel, guilda_id = :guilda_id WHERE id = :id");
        $stmt->execute([
            ':nome' => $mago->getNome(),
            ':nivel' => $mago->getNivel(),
            ':guilda_id' => $mago->getGuildaId(),
            ':id' => $mago->getId()
        ]);
    }

    public function delete(int $id) {
        $stmt = $this->db->prepare("DELETE FROM magos WHERE id = :id");
        $stmt->execute([':id' => $id]);
    }

    // Retorna todos magos da guilda 
    public function getByGuildaId(int $guilda_id): array {
        $stmt = $this->db->prepare("SELECT * FROM magos WHERE guilda_id = :guilda_id");
        $stmt->execute([':guilda_id' => $guilda_id]);

        $magos = [];
        while ($data = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $magos[] = new Mago($data['id'], $data['nome'], $data['nivel'], $data['guilda_id']);
        }

        return $magos;
    }

}

// $database = new Database("127.0.0.1", "3306", "guilda_arcana", "kleber", "root");

// $guildaModel = new GuildaModel($database);
// $magoModel = new MagoModel($database);

// $mago = new Mago(null, "Arnol Neger", 100, 1);
// $magoModel->create($mago);
// var_dump($mago);
// echo "<br><hr>";

// $magos = $magoModel->getByGuildaId(1);
// foreach ($magos as $mago) {
//     var_dump($mago);
//     echo "<br><hr>";
// }

?>