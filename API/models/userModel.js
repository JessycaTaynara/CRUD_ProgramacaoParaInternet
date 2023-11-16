import bancoDeDados from "../database/index.js";

class userModel {
  async login(email, senha) {
    const conexao = await bancoDeDados.conectar();
    const comandoSql = `SELECT * FROM users WHERE email = '${email}' AND senha = '${senha}'`;
    const res = await conexao.query(comandoSql);
    return res.rows;
  }
  async show() {
    const conexao = await bancoDeDados.conectar();
    const comandoSql = "SELECT * FROM users";
    const users = await conexao.query(comandoSql);
    return users.rows;
  }
  async createUser(email, senha){
    const conexao = await bancoDeDados.conectar();
    const comandoSql = 
    `INSERT INTO users (email, senha)
    VALUES ($1, $2)
    ON CONFLICT (email) DO UPDATE SET senha = $2 RETURNING *`;
    const values = [email, senha];
    const users = await conexao.query(comandoSql, values);
    return users.rows;
  }
  async remove(email) {
    const conexao = await bancoDeDados.conectar();
    const comandoSql = 'DELETE FROM users where email=$1;';
    return users.row;
  }
  
}
export default new userModel();
