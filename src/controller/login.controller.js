const loginService = require("../services/login.service");

const findLogin = async (req, res) => {
    const { username, senha } = req.body;
    
    if (!username || !senha) {
        res.status(400).send({ message: "Todos os campos são obrigatórios" });
        return;
    }
    
    const login = await loginService.findUserService(req.body);
    
    if (!login) {
        res.status(400).send({ message: "Não foi possível encontrar o usuário" });
        return;
    }
    
    res.status(200).send({
        message: "Usuário encontrado com sucesso",
        login: {
        "id": login._id,
        username,
        senha,
        },
    });

};


module.exports = { findLogin};