<?php

// require_once __DIR__ . '/../Config/autoload.php';

class MagoMagiaModel {
    private $db;

    public function __construct(Database $database) {
        $this->db = $database->getDb(); //conexão com o banco aqui
    }

    public function create(MagoMagia $magoMagia) {
        $stmt = $this->db->prepare("INSERT INTO mago_magias (mago_id, magia_id) VALUES (:mago_id, :magia_id)");
        $stmt->execute([
            ':mago_id' => $magoMagia->getMagoId(),
            ':magia_id' => $magoMagia->getMagiaId()
        ]);
    }

    public function delete(int $mago_id, int $magia_id) {
        $stmt = $this->db->prepare("DELETE FROM mago_magias WHERE mago_id = :mago_id AND magia_id = :magia_id");
        $stmt->execute([
            ':mago_id' => $mago_id,
            ':magia_id' => $magia_id
        ]);
    }

    public function getMagiasdoMago(int $mago_id): array {
        $stmt = $this->db->prepare("SELECT magias.id, magias.nome, magias.nivel_minimo
        FROM magias
        INNER JOIN mago_magias
        ON magias.id = mago_magias.magia_id
        WHERE mago_magias.mago_id = :mago_id;");

        $stmt->execute([':mago_id' => $mago_id]);
        
        $magias = [];
        while ($data = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $magias[] = new Magia($data['id'], $data['nome'], $data['nivel_minimo']);
        }
        return $magias;
    }
}

// $database = new Database("127.0.0.1", "3306", "guilda_arcana", "kleber", "root");

// $magoModel = new MagoModel($database);
// $mago = $magoModel->getById(1);

// $magoMagiaModel = new MagoMagiaModel($database);
// $magoMagias = $magoMagiaModel->getMagiasdoMago($mago->getId());
// foreach ($magoMagias as $magia){
//     var_dump($magia);
//     echo "<br><hr>";
// }

// $magoMagia = new MagoMagia(1, 1);
// $magoMagiaModel->create($magoMagia);



