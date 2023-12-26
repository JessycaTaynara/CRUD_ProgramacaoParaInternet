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
      const solicitacao = await admModel.getSolicitacoaPorId(id);

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
  async negarSolicitacao(req, res) {
    const id = req.params.id;

    try {
      await admModel.negarSolicitacao(id);
      return res.status(200).send({ message: "Solicitação negada" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Erro ao negar solicitação - ${error}` });
    }
  }
}

export default new AdmController();
