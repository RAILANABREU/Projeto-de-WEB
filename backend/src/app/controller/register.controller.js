const userService = require("../services/user.service");

const user = async (req, res) => {
  const { nome, sobrenome, username, telefone, senha, avatar} = req.body;

  if (!nome || !sobrenome || !username || !telefone || !senha || !avatar) {
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
const findAllUsers = async (req, res) => {
  const users = await userService.findAllUserService();

  if (!users) {
    res.status(400).send({ message: "Não foi possível encontrar usuários" });
    return;
  }

  res.status(200).send(users);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.deleteUser(id);
    return res.status(200).json({user});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { user, findAllUsers, deleteUser };
