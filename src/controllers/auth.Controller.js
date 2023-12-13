import authModel from "../models/authModel.js";
import jwt from "jsonwebtoken"

class authController{
    async login(req, res) {
        const { email, senha } = req.body;
        try {
          const user = await authModel.login(email, senha);
          if (user.length == 0) {
            return res.status(404).send({ mensagem: "Email ou senha incorretos" });
          }
          const token = jwt.sign({email: email}, "jessyca");
          return res.status(200).send({mensagem: "Logado com sucesso", token});
        } catch (error) {
          return res.status(404).send({ mensagem: `Erro ao logar - ${error}` });
        }
      }
}
export default new authController()