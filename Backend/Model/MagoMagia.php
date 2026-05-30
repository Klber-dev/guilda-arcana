<?php 

class MagoMagia{
    private int $mago_id;
    private int $magia_id;

    public function __construct(int $mago_id, int $magia_id) {
        $this->mago_id = $mago_id;
        $this->magia_id = $magia_id;
    }

    public function getMagoId(): int {
        return $this->mago_id;
    }

    public function getMagiaId(): int {
        return $this->magia_id;
    }

    public function setMagoId(int $mago_id): void {
        $this->mago_id = $mago_id;
    }

    public function setMagiaId(int $magia_id): void {
        $this->magia_id = $magia_id;
    }
}