import bancoDeDados from "../database/index.js";

class gatoModel {
  async adicionar_gato(nome, idade, sexo, raca, cor, descricao) {
    const conn = await bancoDeDados.conectar();
    const sql =
      "INSERT INTO gatos (nome, idade, sexo, raca, cor, descricao) VALUES ($1, $2, $3,$4, $5, $6)";
    return await conn.query(sql, [nome, idade, sexo, raca, cor, descricao]);
  }
  async get_gatos(){
    const conn = await bancoDeDados.conectar();
    const sql =
      "SELECT * FROM gatos";
    const gatos = await conn.query(sql);
    return gatos.rows
  }
  async get_gato_por_nome(nome){
    const conn = await bancoDeDados.conectar();
    const sql =
      "SELECT * FROM gatos WHERE nome = ($1)";
    const gatos = await conn.query(sql, [nome]);
    return gatos.rows[0]
  }
  async deleteGato(nome){
    const conn = await bancoDeDados.conectar();
    const sql = "DELETE FROM gatos WHERE nome = ($1)"
    return await conn.query(sql, [nome])
  }
  async deletarAdocao(nomeGato){
    const conn = await bancoDeDados.conectar();
    const sql = "DELETE FROM adocoes WHERE gato = ($1)"
    return await conn.query(sql, [nomeGato])
  }
  async update(nomeAntigo, novoNome, idade, sexo, raca, cor, descricao){
    const conn = await bancoDeDados.conectar()
    const sql = "UPDATE gatos SET nome = ($1), idade = ($2), sexo = ($3), raca = ($4), cor = ($5), descricao = ($6) WHERE nome = ($7)"
    return await conn.query(sql, [novoNome, idade, sexo, raca, cor, descricao, nomeAntigo])
  }
}

export default new gatoModel();
