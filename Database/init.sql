DROP DATABASE IF EXISTS guilda_arcana;
CREATE DATABASE guilda_arcana;
USE guilda_arcana;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    login VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE guildas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    dinheiro INT NOT NULL DEFAULT 0,
    espaco INT NOT NULL DEFAULT 10,
    reputacao INT NOT NULL DEFAULT 0,
    usuario_id INT NOT NULL UNIQUE,

    CONSTRAINT fk_guildas_usuarios
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE magos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nivel INT NOT NULL DEFAULT 1,
    guilda_id INT NOT NULL,

    CONSTRAINT fk_magos_guildas
        FOREIGN KEY (guilda_id)
        REFERENCES guildas(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE magias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    nivel_minimo INT NOT NULL DEFAULT 0
);

CREATE TABLE mago_magias (
    magia_id INT NOT NULL,
    mago_id INT NOT NULL,

    PRIMARY KEY (magia_id, mago_id),

    CONSTRAINT fk_mago_magias_magias
        FOREIGN KEY (magia_id)
        REFERENCES magias(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_mago_magias_magos
        FOREIGN KEY (mago_id)
        REFERENCES magos(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
