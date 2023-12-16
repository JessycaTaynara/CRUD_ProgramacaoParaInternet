import bancoDeDados from "../database/index.js";

class AdmModel {
  async getSolicitacoes() {
    const conn = await bancoDeDados.conectar();
    const sql =
      "SELECT * FROM solicitacoes WHERE solicitacao_rejeitada = false";
    const solicitacoes = await conn.query(sql);
    return solicitacoes.rows;
  }

  async colocarGatoDaSolicitacaoParaAdocao(solicitacao) {
    //aceitar solicitação
    const conn = await bancoDeDados.conectar();
    const sql =
      "INSERT INTO gatos (nome, sexo, cor, descricao, raca) VALUES ($1,$2,$3,$4,$5)";
    await conn.query(sql, [
      solicitacao.gato_nome,
      solicitacao.gato_sexo,
      solicitacao.gato_cor,
      solicitacao.gato_descricao,
      solicitacao.gato_raca,
    ]);
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
    conn.query(sql, [id]);
  }
}

export default new AdmModel();
