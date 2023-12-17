import bancoDeDados from "../database/index.js";

class gatoModel {
  async adicionarGato(nome, sexo, raca, cor, descricao) {
    const conn = await bancoDeDados.conectar();
    const sql =
      "INSERT INTO gatos_para_adotar (nome, sexo, raca, cor, descricao) VALUES ($1, $2, $3,$4, $5)";
    return await conn.query(sql, [nome, sexo, raca, cor, descricao]);
  }
  async getGatosParaAdocao() {
    const conn = await bancoDeDados.conectar();
    const sql = "SELECT * FROM gatos_para_adotar WHERE adotado=false";
    const gatos = await conn.query(sql);
    return gatos.rows;
  }
  async getGatoPorId(id) {
    const conn = await bancoDeDados.conectar();
    const sql = "SELECT * FROM gatos_para_adotar WHERE id = ($1)";
    const gatos = await conn.query(sql, [id]);
    return gatos.rows[0];
  }
  async deleteGato(id) {
    const conn = await bancoDeDados.conectar();
    const sql = "DELETE FROM gatos_para_adotar WHERE id = ($1)";
    return await conn.query(sql, [id]);
  }
  async deletarAdocao(id) {
    const conn = await bancoDeDados.conectar();
    const sql = "DELETE FROM adocoes WHERE id_gato = ($1)";
    return await conn.query(sql, [id]);
  }
  async update(novoNome, novoSexo, novaRaca, novaCor, novaDescricao, id) {
    const conn = await bancoDeDados.conectar();
    const sql =
      "UPDATE gatos_para_adotar SET nome = ($1), sexo = ($2), raca = ($3), cor = ($4), descricao = ($5) WHERE id = ($6)";
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
