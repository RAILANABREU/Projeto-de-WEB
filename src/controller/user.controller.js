const user = (req, res) => {
    const {nome, sobrenome, username, telefone, senha, avatar} = req.body;

    if(!nome || !sobrenome || !username || !telefone || !senha || !avatar) {
        res.status(400).send({ message: "Todos os campos são obrigatórios"});
        return;
    }

    res.status(201).send({ 
        message: "Usuário cadastrado com sucesso",
        user: {
        nome,
        sobrenome,
        username,
        telefone,
        senha,
        avatar
    }
    });

}


module.exports = { user };