<?php

class Mago {
    private ?int $id;
    private string $nome;
    private int $nivel;
    private int $guilda_id;

    public function __construct(?int $id, string $nome, int $nivel, int $guilda_id) {
        $this->id = $id;
        $this->nome = $nome;
        $this->nivel = $nivel;
        $this->guilda_id = $guilda_id;
    }

    public function getId(): ?int {
        return $this->id;
    }

    public function getNome(): string {
        return $this->nome;
    }

    public function getNivel(): int {
        return $this->nivel;
    }

    public function getGuildaId(): int {
        return $this->guilda_id;
    }

    public function setId(int $id): void {
        $this->id = $id;
    }

    public function setNome(string $nome): void {
        $this->nome = $nome;
    }

    public function setNivel(int $nivel): void {
        $this->nivel = $nivel;
    }

    public function setGuildaId(int $guilda_id): void {
        $this->guilda_id = $guilda_id;
    }


}