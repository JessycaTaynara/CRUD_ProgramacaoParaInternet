/*Tabela usuarios*/
CREATE TABLE usuarios (
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) PRIMARY KEY,
    senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(255) NOT NULL
);

/*Tabela gatos*/
CREATE TABLE gatos_para_adotar(
	nome VARCHAR(255) NOT NULL,
	sexo VARCHAR(255) NOT NULL,
	raca VARCHAR(255) NOT NULL,
	cor VARCHAR(255) NOT NULL,
	adotado BOOLEAN DEFAULT false
	descricao VARCHAR(255) NOT NULL,
	id SERIAL PRIMARY KEY 
);

/*Tabela Solicitacoes*/
CREATE TABLE solicitacoes(
	id SERIAL PRIMARY KEY, 
	usuario_solicitante VARCHAR(255) NOT NULL,
	gato_nome VARCHAR(255) NOT NULL,
	gato_sexo VARCHAR(255) NOT NULL,
	gato_raca VARCHAR(255) NOT NULL,
	gato_cor VARCHAR(255) NOT NULL,
	gato_descricao VARCHAR(255) NOT NULL,
	solicitacao_rejeitada boolean NOT NULL DEFAULT false,
	FOREIGN KEY (usuario_solicitante) REFERENCES usuarios(email)
);

/*Tabela Adocoes*/
CREATE TABLE adocoes(
	id_gato Int NOT NULL,
	email_usuario VARCHAR(255) NOT NULL,
	FOREIGN KEY (email_usuario) REFERENCES usuarios(email),
	FOREIGN KEY (id_gato) REFERENCES gatos_para_adotar(id)
);
