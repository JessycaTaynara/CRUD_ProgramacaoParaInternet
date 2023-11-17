import bancoDeDados from "../database/index.js";

class gatoModel {
  async adicionar_gato_adocao(nome, idade, sexo, raca, cor, descricao) {
    const conn = await bancoDeDados.conectar();
    const sql =
      "INSERT INTO gatos (nome, idade, sexo, raca, cor, descricao) VALUES ($1, $2, $3,$4, $5, $6)";
    return await conn.query(sql, [nome, idade, sexo, raca, cor, descricao]);
  }
}

export default new gatoModel();
