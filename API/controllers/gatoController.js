import gatoModel from "../models/gatoModel.js";

class gatoController {
  async addGato(req, res) {
    const { nome, idade, sexo, raca, cor, descricao } = req.body;
    try {
        await gatoModel.adicionar_gato_adocao(nome, idade, sexo, raca, cor, descricao)
        res.status(200).send({mensagem: "Gato adicionado"})
    } catch (error) {
      res.status(500).send({ mensagem: `Erro ao adicionar um gato - ${error}` });
    }
  }
  async getGatos(req, res){
    try{
      const gatos = await gatoModel.get_gatos()
      res.status(200).send(gatos)
    }catch(error){
      res.status(404).send({mensagem: `Erro ao listar gatos - ${error}`})
    }
  }
}

export default new gatoController()