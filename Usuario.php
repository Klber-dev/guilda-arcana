<?php
class Usuario{
    private ?int $id;
    private string $nome;
    private string $login;
    private string $senha;

    public function __construct(?int $id, string $nome, string $login, string $senha) {
        $this->id = $id;
        $this->nome = $nome;
        $this->login = $login;
        $this->senha = $senha;
    }

    public function getId(): ?int {
        return $this->id;
    }

    public function getNome(): string {
        return $this->nome;
    }

    public function getLogin(): string {
        return $this->login;
    }

    public function getSenha(): string {
        return $this->senha;
    }
}

?>