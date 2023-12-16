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
}

export default new AdmController();
