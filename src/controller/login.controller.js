const loginService = require("../services/login.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");


const auth = async (req, res) => {
    const { username, senha } = req.body;
    try {
        console.log(username);
        const user = await loginService.findUserService(username);
        console.log(user);
        if (!user) {
            return res.status(401).send({ error: "Usuário não encontrado" });
        }
        if (!(await bcrypt.compare(senha, user.senha))) {
            return res.status(401).send({ error: "Senha inválida" });
        }
        user.senha = undefined;

        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: 86400,
        });


        return res.send({ user, token });
    } catch (error) {
        return res.status(400).send({ error: "Erro ao buscar usuário" });
    }
}


module.exports = {auth};