import gatoModel from "../models/gatoModel.js";

class gatoController {
  async addGato(req, res) {
    const { nome, idade, sexo, raca, cor, descricao } = req.body;
    try {
      await gatoModel.adicionarGato(nome, idade, sexo, raca, cor, descricao);
      res.status(200).send({ message: "Gato adicionado" });
    } catch (error) {
      res.status(500).send({ message: `Erro ao adicionar um gato - ${error}` });
    }
  }
  async getGatos(req, res) {
    try {
      const gatos = await gatoModel.getGatos();
      res.status(200).send(gatos);
    } catch (error) {
      res.status(404).send({ message: `Erro ao listar gatos - ${error}` });
    }
  }
  async excluirGato(req, res) {
    const { nomeGato } = req.body;
    console.log(nomeGato);
    try {
      await gatoModel.deleteGato(nomeGato);
      res.status(200).send({ message: "Gato excluido" });
    } catch (error) {
      res.status(404).send({ message: `Erro ao deletar gato - ${error}` });
    }
  }
  async deletarAdocao(req, res) {
    const { nomeGato } = req.body;
    try {
      await gatoModel.deletarAdocao(nomeGato);
      res.status(200).send({ message: "adocao excluida" });
    } catch (error) {
      res.status(404).send({ message: `Erro ao deletar adocao - ${error}` });
    }
  }
  async editarGato(req, res) {
    const { nomeAntigo, novoNome, idade, sexo, raca, cor, descricao } =
      req.body;
    try {
      await gatoModel.update(
        nomeAntigo,
        novoNome,
        idade,
        sexo,
        raca,
        cor,
        descricao
      );
      return res.status(200).send({ message: "Gato atualizado com sucesso!" });
    } catch (error) {
      res.status(500).send({ message: `Erro ao atualizar gato - ${error}` });
    }
  }
}

export default new gatoController();
