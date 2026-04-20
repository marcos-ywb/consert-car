CREATE SCHEMA IF NOT EXISTS consert_car;
USE consert_car;

CREATE TABLE usuarios(
    usuario_id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    telefone CHAR(11) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,

    cargo ENUM('OWNER', 'ADMIN', 'MECANICO', 'ATENDENTE') NOT NULL,

    status BOOLEAN NOT NULL DEFAULT TRUE,

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    desativado_em TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY(usuario_id)
);

CREATE TABLE clientes(
    cliente_id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    telefone CHAR(11),

    PRIMARY KEY(cliente_id)
);

CREATE TABLE enderecos(
    endereco_id INT NOT NULL AUTO_INCREMENT,

    cliente_id INT NOT NULL,

    logradouro VARCHAR(255) NOT NULL,
    numero INT NOT NULL,
    bairro VARCHAR(255) NOT NULL,
    cidade VARCHAR(255) NOT NULL,
    estado CHAR(2) NOT NULL,
    complemento VARCHAR(255),

    PRIMARY KEY(endereco_id),
    FOREIGN KEY(cliente_id) REFERENCES clientes(cliente_id)
);

CREATE TABLE veiculos(
    veiculo_id INT NOT NULL AUTO_INCREMENT,

    cliente_id INT NOT NULL,

    placa CHAR(7) NOT NULL UNIQUE,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    ano INT,
    cor VARCHAR(30),

    PRIMARY KEY(veiculo_id),
    FOREIGN KEY(cliente_id) REFERENCES clientes(cliente_id)
);

CREATE TABLE agendamentos(
    agendamento_id INT NOT NULL AUTO_INCREMENT,

    cliente_id INT NOT NULL,
    veiculo_id INT NOT NULL,
    usuario_id INT NOT NULL,

    data_agendada DATETIME NOT NULL,
    descricao_servico TEXT,
    status ENUM('AGENDADO', 'CANCELADO', 'CONCLUIDO') DEFAULT 'AGENDADO',

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,



    PRIMARY KEY(agendamento_id),
    FOREIGN KEY(cliente_id) REFERENCES clientes(cliente_id),
    FOREIGN KEY(veiculo_id) REFERENCES veiculos(veiculo_id),
    FOREIGN KEY(usuario_id) REFERENCES usuarios(usuario_id)
);

CREATE TABLE ordens_servico(
    os_id INT NOT NULL AUTO_INCREMENT,

    veiculo_id INT NOT NULL,
    agendamento_id INT NOT NULL,
    usuario_id INT NOT NULL,

    descricao_servico TEXT NOT NULL,
    diagnostico TEXT NOT NULL,
    valor_total DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    status ENUM('ABERTA', 'EM_ANDAMENTO', 'AGUARDANDO_PECA', 'FINALIZADA', 'CANCELADA') DEFAULT 'ABERTA',
    
    data_entrada TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_saida TIMESTAMP NULL,

    PRIMARY KEY(os_id),
    FOREIGN KEY(veiculo_id) REFERENCES veiculos(veiculo_id),
    FOREIGN KEY(agendamento_id) REFERENCES agendamentos(agendamento_id),
    FOREIGN KEY(usuario_id) REFERENCES usuarios(usuario_id)
);