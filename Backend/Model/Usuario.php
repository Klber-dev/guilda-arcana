<?php
class Usuario{
    private ?int $id;
    private string $nome;
    private string $login;
    private string $senha;

    public function __construct(?int $id = null, string $nome, string $login, string $senha) {
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

    public function setId(int $id){
        $this->id = $id;
    }

    public function setNome(string $nome){
        $this->nome = $nome;
    }

    public function setLogin(string $login){
        $this->login = $login;
    }

    public function setSenha(string $senha){
        $this->senha = $senha;
    }

}

?>