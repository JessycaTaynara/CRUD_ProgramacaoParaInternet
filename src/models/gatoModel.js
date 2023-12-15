import bancoDeDados from "../database/index.js";

class gatoModel {
  async adicionarGato(nome, sexo, raca, cor, descricao) {
    const conn = await bancoDeDados.conectar();
    const sql =
      "INSERT INTO gatos (nome, sexo, raca, cor, descricao) VALUES ($1, $2, $3,$4, $5)";
    return await conn.query(sql, [nome, sexo, raca, cor, descricao]);
  }
  async getGatos() {
    const conn = await bancoDeDados.conectar();
    const sql = "SELECT * FROM gatos";
    const gatos = await conn.query(sql);
    return gatos.rows;
  }
  async getGatoPorId(id) {
    const conn = await bancoDeDados.conectar();
    const sql = "SELECT * FROM gatos WHERE id = ($1)";
    const gatos = await conn.query(sql, [id]);
    return gatos.rows[0];
  }
  async deleteGato(nome) {
    const conn = await bancoDeDados.conectar();
    const sql = "DELETE FROM gatos WHERE nome = ($1)";
    return await conn.query(sql, [nome]);
  }
  async deletarAdocao(nomeGato) {
    const conn = await bancoDeDados.conectar();
    const sql = "DELETE FROM adocoes WHERE gato = ($1)";
    return await conn.query(sql, [nomeGato]);
  }
  async update(novoNome, novoSexo, novaRaca, novaCor, novaDescricao, id) {
    const conn = await bancoDeDados.conectar();
    const sql =
      "UPDATE gatos SET nome = ($1), sexo = ($2), raca = ($3), cor = ($4), descricao = ($5) WHERE id = ($6)";
    return await conn.query(sql, [
      novoNome,
      novoSexo,
      novaRaca,
      novaCor,
      novaDescricao,
      id,
    ]);
  }
}

export default new gatoModel();
