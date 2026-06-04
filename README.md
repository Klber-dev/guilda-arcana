# Guilda Arcana

## Sobre o projeto:
**Guilda arcana** é uma aplicação web com o objetivo de simular o gerenciamento de uma guilda de usuários, guildas magos e magias. A ideia do projeto já paraiva em minha cabeça, mas com o surgimento de um trabalho acadêmico de tema livre, resolvi dar vida a ideia *( ou pelo menos uma parte dela)*.

A proposta do sistema é permitir a criação de uma guilda e gerenciar seus magos associados, de forma que você possa visualizar as informações sobre a guilda, e membros dela respectivamente, sendo um paralelo direto a sistemas de **gestão empresarial** em um escopo mais honesto e reduzido.

## Funcionalidades:
- O sistema conta com CRUD de usuários, guildas e magos.
- Gerenciamento de permissões
- Acesso a informações da guilda e do usuário
- Fácil comunicação entre front e Backend

##Ferramentas utilizadas:
- PHP
- PDO
- MariaDB
- HTML
- React
- Tailwind

## Estrutura do projeto
O projeto arranha a superficie do que seria o padrão MVC, onde separo por pastas e funções cada parte do código afim de evitar uma sobrecarga de responsabilidades *( apesar de continuar sendo um ponto com possibilidade de melhoria )*

`Backend/Controllers/` Responsáveis por receber ações do usuário, aplicar regras de negócio e controlar o fluxo
`Backend/models/` Aqui as tabelas do banco de dados viram uma classe no model, comunicam-se com o banco de dados e aplicam regras relacionais
`Backend/Public/` Roteamento e tomada de decisão de qual ação deve ser executada
`Backend/Config/` Conexão com banco de dados e headers
`Frontend/` Páginas de exibição do usuário e consumo da API

##Banco de dados
O sistema utiliza o banco de dados chamado de guilda_arcana, que conta com as seguintes tabelas:
- Usuarios
- Guildas
- Magos
- Magias
- MagoMagias ( Tabela relacional de muitos para muitos de magos e magias )

Com a estrutura do banco de dados feita, o projeto já pode ser executado, desde que cumpra com todos os requisitos.

#Objetivo
O projeto reúne uma série de conhecimentos que acumulei ao decorrer dos meus estudos, utilizando POO, PHP, banco de dados relacionais e organização em camadas

##Defeitos que já notei e o que melhorar
- necessário validação mais completa nos formulários
- Criptografia de senha ( foi utilizado md5 )
- Sistema de permissões
- Melhor tratamento de erros e comunicação
- Interface no frontend deve ser mais responsiva
- Upload de imagens, melhor personalidade no design
- Melhor organização das rotas
- Sobrecarga de responsabilidades no controller

*Notei que caso o banco de dados venha a quebrar, o backend atual não da nenhum feedback e acaba quebrando o funcionamento do site de forma silenciosa. *

##Autor
Desenvolvido por **Kleber**.

  
