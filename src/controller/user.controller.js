const userService = require("../services/user.service");

const user = async (req, res) => {
  const { nome, sobrenome, username, telefone, senha, avatar } = req.body;

  if (!nome || !sobrenome || !username || !telefone || !senha || !avatar) {
    res.status(400).send({ message: "Todos os campos são obrigatórios" });
    return;
  }

  try {
    const user = await userService.create(req.body);

    res.status(201).send({
      message: "Usuário cadastrado com sucesso",
      user: {
        id: user._id,
        nome,
        sobrenome,
        username,
        telefone,
        senha,
        avatar,
      },
    });
  } catch (error) {
    if (error.message === "Username já está em uso") {
      res.status(400).send({ message: "Nome de usuário já está em uso" });
    } else {
      res.status(400).send({ message: "Não foi possível cadastrar o usuário" });
    }
  }
};

const findAllUsers = async (req, res) => {
  const users = await userService.findAllUserService();

  if (!users) {
    res.status(400).send({ message: "Não foi possível encontrar usuários" });
    return;
  }

  res.status(200).send(users);
};

module.exports = { user, findAllUsers };
