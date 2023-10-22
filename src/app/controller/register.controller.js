const userService = require("../services/register.service");

const user = async (req, res) => {
  const { nome, sobrenome, username, telefone, senha, avatar, secretWords} = req.body;

  if (!nome || !sobrenome || !username || !telefone || !senha || !avatar) {
    res.status(400).send({ message: "Todos os campos são obrigatórios" });
    return;
  }

  if (!user) {
    res.status(400).send({ message: "Não foi possível cadastrar o usuário" });
    return;
  }
  try {
    const user =  await userService.create(req.body);
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
        secretWords,
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
const findAllUsers = async (req, res) => {
  const users = await userService.findAllUserService();

  if (!users) {
    res.status(400).send({ message: "Não foi possível encontrar usuários" });
    return;
  }

  res.status(200).send(users);
};



module.exports = { user, findAllUsers };
