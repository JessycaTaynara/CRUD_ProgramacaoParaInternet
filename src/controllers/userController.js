import userModel from "../models/userModel.js";
import gatoModel from "../models/gatoModel.js";

class userController {
  async show(req, res) {
    try {
      const users = await userModel.show();
      return res.status(200).send(users);
    } catch (error) {
      return res
        .status(500)
        .send({ mensagem: `Erro ao listar usuários - ${error}` });
    }
  }
  async createUser(req, res) {
    const { email, senha } = req.body;
    try {
      const user = await userModel.createUser(email, senha);
      return res.status(200).send(user);
    } catch (error) {
      return res
        .status(500)
        .send({ mensagem: `Erro ao criar usuário - ${error}` });
    }
  }
  async remove(req, res) {
    const email = req.params.email;
    try {
      const user = await userModel.find(email);

      if (!user) {
        return res.status(404).send({ mensagem: "Usuário não encontrado" });
      }

      await userModel.remove(email);
      return res.status(200).send({ mensagem: "Usuário deletado" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Erro ao remover usuário - " + error });
    }
  }
  async adotar(req, res) {
    const { idGato, emailDono } = req.body;
    try {
      await userModel.fazerAdocao(idGato, emailDono);
      res.status(200).send({ mensagem: `Gato ${idGato} adotado!` });
    } catch (error) {
      res.status(500).send({ mensagem: `Erro ao adotar - ${error}` });
    }
  }
  async getMeusGatosAdotados(req, res) {
    const email = req.params.email;
    try {
      const adocoes = await userModel.getMinhasAdocoes(email);

      if (adocoes.length == 0) {
        return res
          .status(500)
          .send({ mensagem: "Você não adotou nenhum gato" });
      }

      const listaGatos = [];

      for (let adocao of adocoes) {
        const dadosDoGato = await gatoModel.getGatoPorId(adocao.gato.id);
        listaGatos.push(dadosDoGato);
      }

      return res.status(200).send(listaGatos);
    } catch (error) {
      return res
        .status(500)
        .send({ mensagem: `Erro ao buscar seus gatos adotados - ${error}` });
    }
  }
}

export default new userController();
