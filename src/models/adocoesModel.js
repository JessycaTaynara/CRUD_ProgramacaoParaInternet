import bancoDeDados from "../database/index.js";

class AdocaoModel {
  async getAdocoes() {
    const conn = await bancoDeDados.conectar();
    const sql = "SELECT * FROM adocoes";
    const adocoes = await conn.query(sql);
    return adocoes.rows;
  }
  async getMinhasAdocoes(email) {
    const conn = await bancoDeDados.conectar();
    const sql = "SELECT * FROM adocoes WHERE email_dono = ($1)";
    const adocoes = await conn.query(sql, [email]);
    return adocoes.rows;
  }
  async fazerAdocao(idGato, emailDono) {
    const conn = await bancoDeDados.conectar();
    const sql1 = "INSERT INTO adocoes (email_dono, id_gato) VALUES ($1, $2)";
    const sql2 =
      "UPDATE gatos_para_adotar   SET adotado = true WHERE id = ($1)";
    await conn.query(sql1, [emailDono, idGato]);
    await conn.query(sql2, [idGato]);
  }
}

export default new AdocaoModel();
