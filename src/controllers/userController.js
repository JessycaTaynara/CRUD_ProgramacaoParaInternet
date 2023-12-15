import userModel from "../models/userModel.js";

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
}

export default new userController();
