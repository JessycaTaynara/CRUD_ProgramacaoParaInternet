import bancoDeDados from "../database/index.js";

class gatoModel {
  async adicionar_gato_adocao(nome, idade, sexo, raca, cor, descricao) {
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
}

export default new gatoModel();
