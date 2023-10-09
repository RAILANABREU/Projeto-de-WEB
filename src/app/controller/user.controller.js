const userService = require("../../services/user.service");

const user = async (req, res) => {
  const { nome, sobrenome, username, telefone, senha, avatar } = req.body;

  if (!nome || !sobrenome || !username || !telefone || !senha || !avatar) {
    res.status(400).send({ message: "Todos os campos são obrigatórios" });
    return;
  }

  const user =  await userService.create(req.body);

  if (!user) {
    res.status(400).send({ message: "Não foi possível cadastrar o usuário" });
    return;
  }

  res.status(201).send({
    message: "Usuário cadastrado com sucesso",
    user: {
      "id": user._id,
      nome,
      sobrenome,
      username,
      telefone,
      senha,
      avatar,
    },
  });
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
