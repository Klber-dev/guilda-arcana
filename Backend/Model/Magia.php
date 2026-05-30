<?php 

class Magia {
    private ?int $id;
    private string $nome;
    private int $nivel_minimo;

    public function __construct(?int $id, string $nome, int $nivel_minimo) {
        $this->id = $id;
        $this->nome = $nome;
        $this->nivel_minimo = $nivel_minimo;
    }

    public function getId(): ?int {
        return $this->id;
    }

    public function getNome(): string {
        return $this->nome;
    }

    public function getNivelMinimo(): int {
        return $this->nivel_minimo;
    }

    public function setId(int $id): void {
        $this->id = $id;
    }

    public function setNome(string $nome): void {
        $this->nome = $nome;
    }

    public function setNivelMinimo(int $nivel_minimo): void {
        $this->nivel_minimo = $nivel_minimo;
    }
}