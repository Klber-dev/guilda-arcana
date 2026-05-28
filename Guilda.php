<?php

class Guilda{
    private ?int $id;
    private string $nome;
    private int $dinheiro; //dinheiro int pq vou tratar como centavos
    private int $espaco;
    private int $reputacao;
    private ?int $usuario_id;

    public function __construct(?int $id = null, string $nome, int $dinheiro, int $espaco, int $reputacao, ?int $usuario_id = null) {
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





















    
}