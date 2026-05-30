<?php

class Database {
    private $db;

    function __construct($host, $port, $dbname, $username, $password)
    {   
        //Instanciando uma classe PDO no atributo $db, passando os parâmetros de conexao 
        $this->db = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password );

        //Forma que o pdo vai lidar com os erros, nesse caso, lançando uma exceção quando ocorrer um erro de banco de dados
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    //Metodo para retornar a conexao com o banco de dados
    public function getDb()
    {
        return $this->db;
    }

}

