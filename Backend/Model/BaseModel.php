<?php

class BaseModel {
    protected $db;

    public function __construct(Database $database) {
        $this->db = $database->getDb();
    }
}