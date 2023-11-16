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
        const user = await userModel.createUser(email, senha);
        return res.status(200).send(user); 
    } catch (error) {
        return res.status(500).send({ message: `Erro ao criar usuário - ${error}` }); 
    }
  }
  async remove(req, res) {
    const email = req.params.email;
    //const user = await userModel.find(email)
    //if (!user)
      //return res.status(404).send({ message: "Usuário não encontrado" });
    await userModel.remove(email);
    res.status(200).send({ message: "Usuário deletado" });
  }

}

export default new userController();