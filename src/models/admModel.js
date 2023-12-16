import bancoDeDados from "../database/index.js";

class AdmModel {
  async getSolicitacoes() {
    const conn = await bancoDeDados.conectar();
    const sql = "SELECT * FROM solicitacoes";
    const solicitacoes = await conn.query(sql);
    return solicitacoes.rows;
  }
}

export default new AdmModel();
