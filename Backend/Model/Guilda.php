<?php

class Guilda{
    private ?int $id;
    private string $nome;
    private int $dinheiro; //dinheiro int pq vou tratar como centavos
    private int $espaco;
    private int $reputacao;
    private ?int $usuario_id;

    public function __construct(?int $id, string $nome, int $dinheiro, int $espaco, int $reputacao, ?int $usuario_id = null) {
        $this->id = $id;
        $this->nome = $nome;
        $this->dinheiro = $dinheiro;
        $this->espaco = $espaco;
        $this->reputacao = $reputacao;
        $this->usuario_id = $usuario_id;
    }

    public function getId(): ?int {
        return $this->id;
    }

    public function getNome(): string{
        return $this->nome;
    }

    public function getDinheiro(): string{
        return $this->dinheiro;
    }

    public function getEspaco(): int{
        return $this->espaco;
    }

    public function getReputacao(): int{
        return $this->reputacao;
    }

    public function getUsuarioId(): ?int{
        return $this->usuario_id;
    }

    public function setId(?int $id): void {
        $this->id = $id;
    }  

    public function setNome(string $nome): void {
        $this->nome = $nome;
    }

    public function setDinheiro(int $dinheiro): void {
        $this->dinheiro = $dinheiro;
    }

    public function setEspaco(int $espaco): void {
        $this->espaco = $espaco;
    }

    public function setReputacao(int $reputacao): void {
        $this->reputacao = $reputacao;
    }

    public function setUsuarioId(?int $usuario_id): void {
        $this->usuario_id = $usuario_id;
    }




















    
}