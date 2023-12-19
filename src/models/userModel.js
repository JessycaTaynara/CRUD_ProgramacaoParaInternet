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
    return usuario;
  }
  async fazerSolicitacao(gato, emailSolicitante) {
    const conn = await bancoDeDados.conectar();
    const sql =
      "INSERT INTO solicitacoes (usuario_solicitante, gato_nome, gato_sexo, gato_raca, gato_cor, gato_descricao) VALUES ($1,$2,$3,$4,$5,$6)";
    await conn.query(sql, [
      emailSolicitante,
      gato.nome,
      gato.sexo,
      gato.raca,
      gato.cor,
      gato.descricao,
    ]);
  }
  async getMinhasSolicitacoes(email) {
    const conn = await bancoDeDados.conectar();
    const sql = "SELECT * FROM solicitacoes WHERE usuario_solicitante = ($1)";
    const solicitacoes = await conn.query(sql, [email]);
    return solicitacoes.rows;
  }
}
export default new userModel();
