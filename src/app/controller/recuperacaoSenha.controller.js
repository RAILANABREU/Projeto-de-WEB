const { model } = require("mongoose");
const userService = require("../services/user.service");
const cripto = require("crypto");

const recuperarSenha = async (req, res) => {
    const {
        username,
    } = req.body;
    
    if (!username) {
        res.status(400).send({
        message: "Todos os campos são obrigatórios"
        });
        return;
    }
    
    try {
        const user = await userService.findUserService(req.body);


    
        if (!user) {
        res.status(400).send({
            message: "Não foi possível encontrar o usuário"
        });
        return;
        }
        // token de recuperação de senha
        token = cripto.randomBytes(20).toString("hex");
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;
        try {
            await user.updateOne(user);
          } catch (error) {
            console.error(error);
            // Aqui você pode imprimir o erro para debug ou tratá-lo de outra forma
          }

        res.status(200).send({
        message: "Usuário encontrado com sucesso",
        user: {
            "id": user._id,
            "secretWords": user.secretWords.split(","),
            "token": user.resetPasswordToken,
        }
        });
    } catch (error) {
        res.status(400).send({
        message: "Não foi possível encontrar o usuário"
        });
        return;
    }
    
    }
    module.exports = { recuperarSenha };