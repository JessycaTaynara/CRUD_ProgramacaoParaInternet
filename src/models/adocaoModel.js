import bancoDeDados from "../database/index.js";

class AdocaoModel {
  async getAdocoes() {
    const conn = await bancoDeDados.conectar();
    const sql = "SELECT * FROM adocoes";
    const adocoes = await conn.query(sql);
    return adocoes.rows;
  }
}

export default new AdocaoModel();
