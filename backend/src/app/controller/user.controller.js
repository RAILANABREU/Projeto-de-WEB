const userServices = require('../services/user.service');

const updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userServices.updateUserService(id, req.body);
        
        if (!user) {
            res.status(400).send({ message: "Não foi possível atualizar o usuário" });
            return;
        }

        user.nome = req.body.nome;
        user.sobrenome = req.body.sobrenome;
        user.username = req.body.username;
        user.telefone = req.body.telefone;
        user.avatar = req.body.avatar;
        user.senha = req.body.senha;
        user.secretWords = req.body.secretWords;
        user.resetPasswordToken = req.body.resetPasswordToken;
        user.resetPasswordExpires = req.body.resetPasswordExpires;
        user.authenticatorToken = req.body.authenticatorToken;
        user.authenticatorExpires = req.body.authenticatorExpires;
        user.jaPagou = req.body.jaPagou;
        user.evento = req.body.evento;
        user.isAdm = req.body.isAdm;
        user.admEvento = req.body.admEvento;
        user.confirmado = req.body.confirmado;
        user.isAtivo = req.body.isAtivo;
        user.isOnline = req.body.isOnline;
        user.convites = req.body.convites;

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
        const user = await userServices.deleteUser(id);
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = { updateUser, findAllUsers, findUserById, findUser, deleteUser };
