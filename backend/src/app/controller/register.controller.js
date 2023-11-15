const userService = require("../services/user.service");

const createUser = async (req, res) => {
  const { nome, sobrenome, username, telefone, senha, avatar} = req.body;
  const userData = req.body;
  console.log('Dados recebidos no backend:', userData);

  if (!nome || !sobrenome || !username || !telefone || !senha) {
    res.status(400).send({ message: "Todos os campos são obrigatórios" });
    return;
  }


  try {
    const user =  await userService.create(req.body);

    if (!user) {
      res.status(400).send({ message: "Não foi possível cadastrar o usuário" });
      return;
    }

    res.status(201).send({
      message: "Usuário cadastrado com sucesso",
      user: {
        "id": user._id,
        secretWords: user.secretWords
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({ message: "Usuário já cadastrado" });
      return;
    }
    else
    res.status(400).send({ message: "Não foi possível cadastrar o usuário" });
    return;
  };
};

module.exports = { createUser };
