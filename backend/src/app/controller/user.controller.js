const userServices = require('../services/user.service');

const updateUser = async (req, res) => {

    try {
        const user = await userServices.findUserService(req.body.username);
        
        if (!user) {
            res.status(400).send({ message: "Não foi possível localizar o usuário" });
            return;
        }
        if (req.body.nome) {
            user.nome = req.body.nome;
        }
        if (req.body.sobrenome) {
            user.sobrenome = req.body.sobrenome;
        }
        if (req.body.username) {
            user.username = req.body.username;
        }
        if (req.body.telefone) {
            user.telefone = req.body.telefone;
        }
        if (req.body.avatar) {
            user.avatar = req.body.avatar;
        }
        if (req.body.resetPasswordToken) {
            user.resetPasswordToken = req.body.resetPasswordToken;
        }
        if (req.body.resetPasswordExpires) {
            user.resetPasswordExpires = req.body.resetPasswordExpires;
        }
        if (req.body.authenticatorToken) {
            user.authenticatorToken = req.body.authenticatorToken;
        }
        if (req.body.authenticatorExpires) {
            user.authenticatorExpires = req.body.authenticatorExpires;
        }
        if (req.body.jaPagou) {
            user.jaPagou = req.body.jaPagou;
        }
        if (req.body.isAdm) {
            user.isAdm = req.body.isAdm;
        }
        if (req.body.admEvento) {
            user.admEvento = req.body.admEvento;
        }
        if (req.body.confirmado) {
            user.confirmado = req.body.confirmado;
        }
        if (req.body.isAtivo) {
            user.isAtivo = req.body.isAtivo;
        }
        if (req.body.isOnline) {
            user.isOnline = req.body.isOnline;
        }
        await user.updateOne(user);
        res.status(200).send({
            message: "Usuário atualizado com sucesso",
            user,
        });
    }
    catch (error) {
        res.status(400).send({ message: "Não foi possível atualizar o usuário" });
        return;
    }
}

const findAllUsers = async (req, res) => {
    try {
        const user = await userServices.findAllUserService();
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const findUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userServices.findUserByIdService(id);
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const findUser = async (req, res) => {
    const { username } = req.body;
    try {
        const user = await userServices.findUserService(req.body);
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userServices.deleteUserService(id);
        return res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = { updateUser, findAllUsers, findUserById, findUser, deleteUser };
