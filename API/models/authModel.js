import bancoDeDados from "../database/index.js";

class authModel {
    async login(email, senha) {
        const conn = await bancoDeDados.conectar();
        const sql = `SELECT * FROM users WHERE email = '${email}' AND senha = '${senha}'`;
        const res = await conn.query(sql);
        return res.rows[0];
      }
}

export default new authModel()