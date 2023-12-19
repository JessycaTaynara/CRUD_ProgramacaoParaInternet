import userModel from "../models/userModel.js";

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
}

export default new userController();
