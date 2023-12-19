import adocaoModel from "../models/adocaoModel";

class AdocaoController {
  async getAdocoes(req, res) {
    try {
      const adocoes = await adocaoModel.getAdocoes();

      if (!adocoes) {
        return res.status(404).send({ message: "Nenhuma adoção encontrada" });
      }

      return res.status(200).json(adocoes);
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Erro ao buscar adoções - ${error}` });
    }
  }
}

export default new AdocaoController();
