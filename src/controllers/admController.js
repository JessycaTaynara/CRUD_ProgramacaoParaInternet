import admModel from "../models/admModel.js";
class AdmController {
  async getSolicitacoes(req, res) {
    try {
      const solicitacoes = await admModel.getSolicitacoes();
      return res.status(200).json(solicitacoes);
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Erro ao buscar solicitações - ${error}` });
    }
  }
  async aceitarSolicitacao(req, res) {
    const id = req.params.id;
    try {
      const solicitacao = admModel.getSolicitacoaPorId(id);

      if (!solicitacao) {
        return res.status(404).send({ message: "Solicitação não encontrada" });
      }

      await admModel.colocarGatoDaSolicitacaoParaAdocao(solicitacao);
      await admModel.removerSolicitacao(id);

      return res.status(200).send({ message: "Solicitação aceita" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Erro ao aceitar solicitação - ${error}` });
    }
  }
}

export default new AdmController();
