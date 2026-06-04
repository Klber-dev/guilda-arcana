# Guilda Arcana

## Sobre o projeto

**Guilda Arcana** é uma aplicação web com o objetivo de simular o gerenciamento de uma guilda, envolvendo usuários, guildas, magos e magias.

A ideia do projeto já pairava na minha cabeça, mas, com o surgimento de um trabalho acadêmico de tema livre, resolvi dar vida à ideia — ou pelo menos a uma parte dela.

A proposta do sistema é permitir a criação de uma guilda e o gerenciamento dos magos associados a ela. Dessa forma, é possível visualizar informações sobre a guilda e seus respectivos membros, criando um paralelo direto com sistemas de **gestão empresarial**, mas em um escopo mais honesto e reduzido.

## Funcionalidades

* CRUD de usuários, guildas e magos;
* Estrutura inicial de permissões;
* Acesso a informações da guilda e do usuário;
* Comunicação entre front-end e back-end;
* Relacionamento entre magos e magias.

## Ferramentas utilizadas

* PHP
* PDO
* MariaDB
* HTML
* React
* Tailwind CSS

## Estrutura do projeto

O projeto arranha a superfície do que seria o padrão MVC. A organização foi feita separando pastas e funções para cada parte do código, com o objetivo de evitar uma sobrecarga de responsabilidades — apesar de esse ainda ser um ponto com possibilidade de melhoria.

* `Backend/Controllers/`: responsáveis por receber ações do usuário, aplicar regras de negócio e controlar o fluxo da aplicação;
* `Backend/Models/`: onde as tabelas do banco de dados são representadas como classes, comunicando-se com o banco e aplicando regras relacionais;
* `Backend/Public/`: responsável pelo roteamento e pela tomada de decisão sobre qual ação deve ser executada;
* `Backend/Config/`: arquivos de conexão com o banco de dados e configuração de headers;
* `Frontend/`: páginas exibidas ao usuário e consumo da API.

## Banco de dados

O sistema utiliza o banco de dados `guilda_arcana`, que conta com as seguintes tabelas principais:

* `Usuarios`
* `Guildas`
* `Magos`
* `Magias`
* `MagoMagias`

A tabela `MagoMagias` é uma tabela relacional usada para representar a relação de muitos para muitos entre magos e magias.

Com a estrutura do banco de dados criada, o projeto já pode ser executado, desde que todos os requisitos estejam configurados corretamente.

## Objetivo

O projeto reúne uma série de conhecimentos que acumulei ao decorrer dos meus estudos, utilizando programação orientada a objetos, PHP, banco de dados relacional e organização em camadas.

## Defeitos que já notei e o que melhorar

* Validação mais completa nos formulários;
* Criptografia de senha mais segura, já que atualmente foi utilizado `md5`;
* Sistema de permissões mais bem estruturado;
* Melhor tratamento de erros e comunicação com o usuário;
* Interface do front-end mais responsiva;
* Upload de imagens;
* Mais personalidade no design;
* Melhor organização das rotas;
* Redução da sobrecarga de responsabilidades nos controllers.

> Notei que, caso o banco de dados venha a quebrar, o back-end atual não dá nenhum feedback claro e acaba quebrando o funcionamento do site de forma silenciosa.

## Autor

Desenvolvido por **Kleber**.
