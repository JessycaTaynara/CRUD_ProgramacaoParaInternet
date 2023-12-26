import bancoDeDados from "../database/index.js";

class userModel {
  async show() {
    const conn = await bancoDeDados.conectar();
    const sql = "SELECT * FROM usuarios";
    const users = await conn.query(sql);
    return users.rows;
  }
  async createUser(email, senha, tipo, nome) {
    const conn = await bancoDeDados.conectar();
    const sql = `INSERT INTO usuarios (email, senha, nome, tipo)
    VALUES ($1, $2, $3, $4);`;
    const values = [email, senha, nome, tipo];
    await conn.query(sql, values);
  }
  async remove(email) {
    const conn = await bancoDeDados.conectar();
    const sql = "DELETE FROM usuarios where email=($1);";
    return await conn.query(sql, [email]);
  }
  async userPorEmail(email) {
    const conn = await bancoDeDados.conectar();
    const sql = "SELECT * FROM usuarios WHERE email=($1)";
    const usuario = await conn.query(sql, [email]);
    return usuario.rows[0];
  }
}
export default new userModel();
