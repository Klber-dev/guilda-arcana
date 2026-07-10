<?php 

// require_once __DIR__ . '/../Config/autoload.php';

class MagiaModel extends BaseModel {
    public function __construct(Database $database) {
        parent::__construct($database);
    }

    public function create (Magia $magia) {
        $stmt = $this->query("INSERT INTO magias (nome, nivel_minimo) VALUES (:nome, :nivel_minimo)", [
            ':nome' => $magia->getNome(),
            ':nivel_minimo' => $magia->getNivelMinimo()
        ]);

        $magia->setId($this->db->lastInsertId()); 
    }

    public function getByName(string $nome): ?Magia {
        $stmt = $this->query("SELECT * FROM magias WHERE nome = :nome", [':nome' => $nome]);

        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($data) {
            return new Magia($data['id'], $data['nome'], $data['nivel_minimo']);
        } else {
            return null;
        }
    }

    public function update(Magia $magia){
        $this->query("UPDATE magias SET nome = :nome, nivel_minimo = :nivel_minimo WHERE id = :id", [
            ':nome' => $magia->getNome(),
            ':nivel_minimo' => $magia->getNivelMinimo(),
            ':id' => $magia->getId()
        ]);
    }

    public function delete(int $id) {
        $this->query("DELETE FROM magias WHERE id = :id", [':id' => $id]);
    }

    public function getById(int $id): ?Magia {
        $stmt = $this->query("SELECT * FROM magias WHERE id = :id", [':id' => $id]);

        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($data) {
            return new Magia($data['id'], $data['nome'], $data['nivel_minimo']);
        } else {
            return null;
        }
    }

    public function getAll(): array {
        $stmt = $this->query("SELECT * FROM magias");
        $magias = [];
        while ($data = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $magias[] = new Magia($data['id'], $data['nome'], $data['nivel_minimo']);
        }
        return $magias;
    }
}

// $database = new Database("127.0.0.1", "3306", "guilda_arcana", "kleber", "root");

// $magiaModel = new MagiaModel($database);
// $magia = new Magia(null, "acid-arrow", 2);
// $magiaModel->create($magia);

// var_dump($magia); 

//Aqui, a magia ainda não se relaciona com ninguém e é um dado bruto que pode ser usado para criar uma relação com um mago dps
//A ideia é pegar da API e salvar só o index da magia e o nivel pra regras de negócio. Com isso, a gente tem a magia salva e pode relacionar com os magos depois, sem precisar ficar buscando na API toda hora
?>