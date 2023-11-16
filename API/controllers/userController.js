import userModel from "../models/userModel.js";

class userController {
  async login(req, res) {
    const { email, senha } = req.body;
    try {
      const user = await userModel.login(email, senha);
      if (user.length == 0) {
        return res.status(404).send({ message: "Email ou senha incorretos" });
      }
      return res.status(200).send(user[0]);
    } catch (error) {
      return res.status(404).send({ message: `Erro ao logar - ${error}` });
    }
  }
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
  async create(req, res) {
    const { email, senha } = req.body;
    try {
        const result = await userModel.createUser(email, senha);
        if (result.success) {
            return res.status(200).json(result.user); 
        } else {
            return res.status(404).json({ message: "Erro ao criar ou atualizar usuário" });
        }
    } catch (error) {
        return res.status(500).json({ message: `Erro ao criar usuário - ${error}` }); 
    }
  }

}

export default new userController();