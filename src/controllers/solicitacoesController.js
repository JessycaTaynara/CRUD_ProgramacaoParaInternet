import solicitacoesModel from "../models/solicitacoesModel.js";
import admModel from "../models/admModel.js";

class SolicitacoesController {
  async solicitarAdocao(req, res) {
    const { gato, emailSolicicitante } = req.body;
    try {
      await solicitacoesModel.fazerSolicitacao(gato, emailSolicicitante);
      return res.status(200).send({
        message:
          "Solicitação feita com sucesso! Aguarde a aprovação pelos administradores do site",
      });
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Erro ao fazer solicitação de adoção - ${error}` });
    }
  }
  async getMinhasSolicitacoes(req, res) {
    const email = req.params.email;
    try {
      const solicitacoes = await solicitacoesModel.getMinhasSolicitacoes(email);

      if (solicitacoes.length === 0) {
        return res
          .status(404)
          .send({ message: "Você ainda não fez nenhuma solicitação" });
      }

      return res.status(200).json(solicitacoes);
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Erro ao buscar suas solicitações - ${error}` });
    }
  }
  async getSolicitacoes(req, res) {
    try {
      const solicitacoes = await solicitacoesModel.getSolicitacoes();
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
      const solicitacao = await solicitacoesModel.getSolicitacoaPorId(id);

      if (!solicitacao) {
        return res.status(404).send({ message: "Solicitação não encontrada" });
      }
      await admModel.colocarGatoDaSolicitacaoParaAdocao(solicitacao);
      await solicitacoesModel.aceitarSolicitacao(id);

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
      await solicitacoesModel.negarSolicitacao(id);
      return res.status(200).send({ message: "Solicitação negada" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Erro ao negar solicitação - ${error}` });
    }
  }
}

export default new SolicitacoesController();
