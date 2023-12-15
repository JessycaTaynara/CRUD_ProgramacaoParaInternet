import bancoDeDados from "../database/index.js";

class userModel {
  async show() {
    const conn = await bancoDeDados.conectar();
    const sql = "SELECT * FROM usuarios_comuns";
    const users = await conn.query(sql);
    return users.rows;
  }
  async createUser(email, senha) {
    const conn = await bancoDeDados.conectar();
    const sql = `INSERT INTO usuarios_comuns (email, senha)
    VALUES ($1, $2);`;
    const values = [email, senha];
    await conn.query(sql, values);
  }
  async remove(email) {
    const conn = await bancoDeDados.conectar();
    const sql = "DELETE FROM usuarios_comuns where email=($1);";
    return await conn.query(sql, [email]);
  }
  async getMinhasAdocoes(email) {
    const conn = await bancoDeDados.conectar();
    const sql = "SELECT * FROM email_dono WHERE dono = ($1)";
    const adocoes = await conn.query(sql, [email]);
    return adocoes.rows;
  }
  async fazerAdocao(idGato, emailDono) {
    const conn = await bancoDeDados.conectar();
    const sql1 = "INSERT INTO adocoes (email_dono, idGato) VALUES ($1, $2)";
    const sql2 = "UPDATE gatos SET adotado = true WHERE id = ($1)";
    await conn.query(sql1, [emailDono, idGato]);
    await conn.query(sql2, [idGato]);
  }
  async find(email) {
    const conn = await bancoDeDados.conectar();
    const sql = "SELECT * FROM usuarios_comuns WHERE email=($1)";
    const usuario = await conn.query(sql, [email]);
    return usuario;
  }
}
export default new userModel();
