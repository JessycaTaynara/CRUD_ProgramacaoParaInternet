import userModel from "../models/userModel.js";

class CadastroUserController{
    async cadastrarUser(req, res){
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
}
export default new CadastroUserController()