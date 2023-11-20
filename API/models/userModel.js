import bancoDeDados from "../database/index.js";

class userModel {
  async show() {
    const conn = await bancoDeDados.conectar();
    const sql = "SELECT * FROM users";
    const users = await conn.query(sql);
    return users.rows;
  }
  async createUser(email, senha) {
    const conn = await bancoDeDados.conectar();
    const sql = `INSERT INTO users (email, senha)
    VALUES ($1, $2)
    ON CONFLICT (email) DO UPDATE SET senha = $2 RETURNING *`;
    const values = [email, senha];
    const users = await conn.query(sql, values);
    return users.rows;
  }
  async remove(email) {
    const conn = await bancoDeDados.conectar();
    const sql = "DELETE FROM users where email=$1;";
    return await conn.query(sql, [email]);
  }
  async getAdocoes(email){
    const conn = await bancoDeDados.conectar();
    const sql = "SELECT * FROM adocoes WHERE dono = ($1)";
    const adocoes = await conn.query(sql, [email]);
    return adocoes.rows
  }
  async fazerAdocao(nomeGato, emailDono){
    const conn = await bancoDeDados.conectar();
    const sql = "INSERT INTO adocoes (dono, gato) VALUES ($1, $2); UPDATE gatos SET adotado = true WHERE nome = ($3);";
    return await conn.query(sql, [emailDono, nomeGato, nomeGato]);
  }
}
export default new userModel();
