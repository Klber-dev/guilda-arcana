<?php

class Database {
    private $db;

    function __construct($host, $port, $dbname, $username, $password)
    {   
        //Instanciamos uma classe PDO no atributo $db, passando os parâmetros de conexao 
        $this->db = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password );

        //Forma que o pdo vai lidar com os erros
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    //Metodo para retornar a conexao com o banco de dados
    public function getDb()
    {
        return $this->db;
    }
}

