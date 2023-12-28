import bancoDeDados from "../database/index.js";

class SolicitacoesMode {
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
  async getSolicitacoaPorId(id) {
    const conn = await bancoDeDados.conectar();
    const sql = "SELECT * FROM solicitacoes WHERE id = ($1)";
    const solicitacao = await conn.query(sql, [id]);
    return solicitacao.rows[0];
  }
  async getSolicitacoes() {
    const conn = await bancoDeDados.conectar();
    const sql = "SELECT * FROM solicitacoes";
    const solicitacoes = await conn.query(sql);

    return solicitacoes.rows;
  }
  async removerSolicitacao(id) {
    const conn = await bancoDeDados.conectar();
    const sql = "DELETE FROM solicitacoes WHERE id = ($1)";
    await conn.query(sql, [id]);
  }
  async negarSolicitacao(id) {
    const conn = await bancoDeDados.conectar();
    const sql =
      "UPDATE solicitacoes SET solicitacao_rejeitada = true WHERE id = ($1)";
    await conn.query(sql, [id]);
  }
}

export default new SolicitacoesMode();
