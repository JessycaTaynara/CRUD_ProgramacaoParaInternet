import gatoModel from "../models/gatoModel.js";
import userModel from "../models/userModel.js";

class gatoController {
  async addGato(req, res) {
    const { nome, idade, sexo, raca, cor, descricao } = req.body;
    try {
        await gatoModel.adicionar_gato(nome, idade, sexo, raca, cor, descricao)
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
  async getSeuGatosAdotados(req, res){
    const email = req.params.email
    console.log("seusGatos")
    try{
      const adocoes = await userModel.getAdocoes(email)
      if(adocoes.length == 0){
        return res.status(500).send({mensagem: "Você não adotou nenhum gato"})
      }
      const listaGatos = []
      for(let adocao of adocoes){
        const dadosDoGato = await gatoModel.get_gato_por_nome(adocao.gato)
        listaGatos.push(dadosDoGato)
      }
      
      return res.status(200).send(listaGatos)
    }catch(error){
      return res.status(500).send({mensagem: `Erro ao buscar seus gatos adotados - ${error}`})
    }
  }
  async excluirGato(req, res){
    const {nomeGato} = req.body
    console.log(nomeGato)
    try{
      await gatoModel.deleteGato(nomeGato)
      res.status(200).send({mensagem: "Gato excluido"})
    }catch(error){
      res.status(404).send({mensagem: `Erro ao deletar gato - ${error}`})
    }
  }
  async deletarAdocao(req, res){
    const {nomeGato} = req.body
    try{
      await gatoModel.deletarAdocao(nomeGato)
      res.status(200).send({mensagem: "adocao excluida"})
    }catch(error){
      res.status(404).send({mensagem: `Erro ao deletar adocao - ${error}`})
    }
  }
  async editarGato( req, res){
    const {nomeAntigo, novoNome, idade, sexo, raca, cor, descricao} = req.body
    try{
      await gatoModel.update(nomeAntigo, novoNome, idade, sexo, raca, cor, descricao)
      return res.status(200).send({mensagem: "Gato atualizado com sucesso!"})
    }catch(error){
      res.status(500).send({mensagem: `Erro ao atualizar gato - ${error}`})
    }
  }
}

export default new gatoController()