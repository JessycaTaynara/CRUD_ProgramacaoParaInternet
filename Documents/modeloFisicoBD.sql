/*Tabela Administradores*/
CREATE TABLE administradores (
    email VARCHAR(255) PRIMARY KEY,
    senha VARCHAR(255) NOT NULL,
	nome VARCHAR(255) NOT NULL, 
    tipo VARCHAR(255) NOT NULL DEFAULT 'adm'
);

/*Tabela usuarios_comuns*/
CREATE TABLE usuarios_comuns (
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) PRIMARY KEY,
    senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(255) NOT NULL DEFAULT 'comum'
);

/*Tabela gatos*/
CREATE TABLE gatos(
	nome VARCHAR(255) NOT NULL,
	sexo VARCHAR(255) NOT NULL,
	raca VARCHAR(255) NOT NULL,
	cor VARCHAR(255) NOT NULL,
	descricao VARCHAR(255) NOT NULL,
	id SERIAL PRIMARY KEY 
);

/*Tabela Solicitacoes*/
CREATE TABLE solicitacoes(
	id SERIAL PRIMARY KEY, 
	email_usuario VARCHAR(255) NOT NULL,
	id_gato int NOT NULL,
	FOREIGN KEY (email_usuario) REFERENCES usuarios_comuns(email),
	FOREIGN KEY (id_gato) REFERENCES gatos(id)
);

/*Tabela Adocoes*/
CREATE TABLE adocoes(
	id_gato Int NOT NULL,
	email_usuario VARCHAR(255) NOT NULL,
	FOREIGN KEY (email_usuario) REFERENCES usuarios_comuns(email),
	FOREIGN KEY (id_gato) REFERENCES gatos(id)
);
