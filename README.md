# Guilda Arcana

**Aplicação:** https://guilda-arcana.up.railway.app

## Sobre o projeto

**Guilda Arcana** é uma aplicação web com o objetivo de simular o gerenciamento de uma guilda, envolvendo usuários, guildas, magos e magias.

A ideia do projeto já pairava na minha cabeça, mas, com o surgimento de um trabalho acadêmico de tema livre, resolvi dar vida à ideia — ou pelo menos a uma parte dela.

A proposta do sistema é permitir a criação de uma guilda e o gerenciamento dos magos associados a ela. Dessa forma, é possível visualizar informações sobre a guilda e seus respectivos membros, criando um paralelo direto com sistemas de **gestão empresarial**, mas em um escopo mais honesto e reduzido.

## Funcionalidades

* Cadastro, login, atualização e exclusão de usuários;
* Criação, atualização, visualização e exclusão de guildas;
* Cadastro, listagem, atualização de nível e exclusão de magos;
* Relacionamento entre magos e magias;
* Consumo de API externa para consulta de magias;
* Estrutura inicial de permissões baseada em usuário logado;
* Comunicação entre front-end e back-end;
* Tratamento padronizado de erros entre API e interface;
* Mensagens amigáveis para o usuário e mensagens detalhadas em modo debug.

## Ferramentas utilizadas

* PHP
* PDO
* MariaDB
* HTML
* React
* Axios
* Tailwind CSS

## Estrutura do projeto

O projeto arranha a superfície do que seria o padrão MVC. A organização foi feita separando pastas e responsabilidades para cada parte do código, com o objetivo de evitar uma sobrecarga excessiva em um único arquivo ou camada — apesar de esse ainda ser um ponto com possibilidade de melhoria.

* `Backend/Controllers/`: responsáveis por receber ações do usuário, aplicar regras de negócio e controlar o fluxo da aplicação;
* `Backend/Models/`: responsáveis pela comunicação com o banco de dados e execução das consultas;
* `Backend/Domain/`: classes que representam as entidades principais do sistema;
* `Backend/Public/`: responsável pelo ponto de entrada da API e roteamento das requisições;
* `Backend/Config/`: arquivos de configuração, headers e autoload;
* `Frontend/`: páginas exibidas ao usuário, componentes visuais e consumo da API.

## Banco de dados

O sistema utiliza o banco de dados `guilda_arcana`, que conta com as seguintes tabelas principais:

* `usuario`;
* `guilda`;
* `mago`;
* `magia`;
* `mago_magia`.

A tabela `mago_magia` é uma tabela relacional usada para representar a relação de muitos para muitos entre magos e magias.

A estrutura geral do banco segue a seguinte lógica:

* Um usuário pode possuir uma guilda;
* Uma guilda pode possuir vários magos;
* Um mago pode aprender várias magias;
* Uma magia pode estar associada a vários magos.

Com a estrutura do banco de dados criada, o projeto já pode ser executado, desde que todos os requisitos estejam configurados corretamente.

## Segurança

Inicialmente, o projeto utilizava `md5` para armazenar senhas. Essa abordagem foi substituída por uma forma mais segura utilizando as funções nativas do PHP:

* `password_hash()` para gerar o hash da senha no cadastro;
* `password_verify()` para validar a senha no login.

Dessa forma, as senhas não são salvas em texto puro nem com algoritmos frágeis de hash.

Também foi adicionado um controle de debug via variável de ambiente:

```env
DEBUG=true
```

Quando o modo debug está ativo, o back-end pode retornar informações técnicas mais detalhadas sobre erros. Quando está desativado, apenas mensagens amigáveis são enviadas ao usuário.

## Tratamento de erros

O projeto recebeu uma melhoria no tratamento de erros entre back-end e front-end.

No back-end, os erros passaram a seguir uma estrutura mais padronizada, com informações como:

```json
{
  "status": "error",
  "type": "database",
  "message": "Ocorreu um erro no servidor."
}
```

Em modo debug, a resposta retorna a exception em mais detalhes.

Também foram utilizados códigos HTTP mais adequados para alguns cenários, como:

* `400` para erros de validação;
* `401` para usuário não autenticado;
* `403` para falta de permissão;
* `404` para recurso não encontrado;
* `409` para conflitos de regra de negócio;
* `500` para erros internos ou falhas no banco de dados.

No front-end, o Axios foi configurado com interceptors para centralizar o tratamento das respostas da API. Assim, as páginas conseguem lidar melhor com erros de validação, autenticação, banco de dados e falhas de comunicação.

## Front-end

O front-end foi desenvolvido com React e Tailwind CSS, buscando uma identidade visual inspirada em fantasia, grimórios e sistemas de guilda.

As principais páginas incluem:

* Login;
* Cadastro;
* Perfil do usuário;
* Perfil da guilda;
* Cadastro de magos;
* Spellbook;
* Detalhes de magia.

A comunicação com o back-end é feita com Axios, através de um serviço centralizado de API.

## Objetivo

O projeto reúne uma série de conhecimentos acumulados ao longo dos meus estudos, utilizando programação orientada a objetos, PHP, banco de dados relacional, React, consumo de API externa e organização em camadas.

Além de cumprir a proposta acadêmica, o projeto também serviu como forma de praticar conceitos importantes de desenvolvimento web, como:

* Separação entre front-end e back-end;
* Organização de rotas;
* Requisições HTTP;
* Sessões;
* Relacionamentos em banco de dados;
* Tratamento de erros;
* Segurança básica no armazenamento de senhas;
* Versionamento e releases.

## Defeitos que já notei e o que melhorar

* Sistema de permissões mais bem estruturado;
* Implementação mais completa de autenticação, possivelmente com tokens;
* Melhor organização das rotas;
* Redução da sobrecarga de responsabilidades nos controllers;
* Validação mais completa nos formulários;
* Melhor responsividade em algumas telas;
* Upload de imagens;
* Mais personalidade e variação no design das páginas;
* Separação mais clara entre erros de regra de negócio e erros técnicos;
* Melhor estrutura para deploy.

## Observações

O projeto ainda possui limitações por ter sido desenvolvido dentro de um contexto acadêmico e com foco em aprendizado. Ainda assim, ele representa uma evolução importante na minha prática com PHP, banco de dados, React e organização de aplicações web.

## Autor

Desenvolvido por **Kleber**.
