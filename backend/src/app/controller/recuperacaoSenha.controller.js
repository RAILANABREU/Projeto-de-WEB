const { model } = require("mongoose");
const userService = require("../services/user.service");
const cripto = require("crypto");

const recuperarSenha = async (req, res) => {
    const {
        username,
        secretWords,
    } = req.body;
    
    if (!username || !secretWords) {
        res.status(400).send({
        message: "Todos os campos são obrigatórios"
        });
        return;
    }
    
    try {
        const user = await userService.findUserService(username);

        if (!user) {
        res.status(400).send({
            message: "Não foi possível encontrar o usuário"
        });
        return;
        }
        if (user.secretWords !== secretWords.join(",")) {
        res.status(400).send({
            message: "As palavras secretas não conferem"
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

    const bcrypt = require("bcrypt");

    const resetarSenha = async (req, res) => {
        const {
            id,
            token,
            password,
        } = req.body;
        
        if (!id || !token || !password) {
            res.status(400).send({
                message: "Todos os campos são obrigatórios"
            });
            return;
        }
        
        try {
            const user = await userService.findUserByIdRZT(id);
            if (!user) {
                res.status(400).send({
                    message: "Não foi possível encontrar o usuário"
                    
                });
                return;
            }
            
            if (user.resetPasswordToken.toString() !== token) {
                res.status(400).send({
                    message: "Token inválido"
                });
                return;
            }
            if (user.resetPasswordExpires < Date.now()) {
                res.status(400).send({
                    message: "Token expirado"
                });
                return;
            }
            user.senha = await bcrypt.hash(password, 10)
            user.resetPasswordToken = null;
            user.resetPasswordExpires = null;
          
            await user.updateOne(user);
          
            res.status(200).send({
                message: "Senha alterada com sucesso",
                user: {
                    "id": user._id,
                }
            });
        } catch (error) {
            res.status(400).send({
                message: "Não foi possível encontrar o usuário"
            });
            return;
        }
    }

    module.exports = { recuperarSenha, resetarSenha };