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
        .send({ message: `Erro ao listar usuários - ${error}` });
    }
  }
  async createUser(req, res) {
    const { email, senha, nome } = req.body;
    try {
      const user = await userModel.createUser(email, senha, "comum", nome);
      return res.status(200).send({ message: "Usuário criado com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Erro ao criar usuário - ${error}` });
    }
  }
  async remove(req, res) {
    const email = req.params.email;
    try {
      const user = await userModel.find(email);

      if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado" });
      }

      await userModel.remove(email);
      return res.status(200).send({ message: "Usuário deletado" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Erro ao remover usuário - " + error });
    }
  }
  async solicitarAdocao(req, res) {
    const { gato, emailSolicicitante } = req.body;
    try {
      await userModel.fazerSolicitacao(gato, emailSolicicitante);
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
      const solicitacoes = await userModel.getMinhasSolicitacoes(email);

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
}

export default new userController();
