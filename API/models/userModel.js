import bancoDeDados from "../database/index.js";

class userModel {
  async login(email, senha) {
    const conn = await bancoDeDados.conectar();
    const sql = `SELECT * FROM users WHERE email = '${email}' AND senha = '${senha}'`;
    const res = await conn.query(sql);
    return res.rows;
  }
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
}
export default new userModel();
