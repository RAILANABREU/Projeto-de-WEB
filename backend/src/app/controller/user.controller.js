const userServices = require('../services/user.service');
const eventoServices = require('../services/evento.service');

const updateUser = async (req, res) => {

    try {
        const user = await userServices.findUserByIdService(req.body.id);
        
        if (!user) {
            res.status(400).send({ message: "Não foi possível localizar o usuário",
                                    user: user });
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
        const user = await userServices.findUserService(username);
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const deleteEventoService = async (id) => {
    const evento = await eventoServices.findEventoByIdService(id);

    if (!evento) {
        return console.log({ message: "Evento não encontrado" });
    }
    await evento.deleteOne(evento);

    const user = await userServices.findUserByIdService(evento.admID);
    const index = user.EventosAdm.indexOf(evento._id);
    if (index > -1){
        user.EventosAdm.splice(index, 1);
        await user.updateOne(user);
    }else{
        return console.log({ message: "Evento não encontrado" });
    }
    const users = await userServices.findAllUserService();
    for ( const user of users){
        for(const evento of user.eventosConfirmados){
            if(evento.toString() === id){
                user.eventosConfirmados.pull(evento)
                await user.updateOne(user);
            }
        }
        for(const evento of user.convites){
            if(evento.toString() === id){
                user.convites.pull(evento)
                await user.updateOne(user);
            }}
        }
    };

    const deleteUser = async (req, res) => {
        const { id } = req.params;
        try {
            const user = await userServices.findUserByIdService(id);
            if (!user) {
                return res.status(400).json({ message: "Usuário não encontrado" });
            }
            for (const idevento of user.eventosConfirmados) {
                const evento = await eventoServices.findEventoByIdService(idevento);
                for (const convidado of evento.convidados) {
                    if (convidado.idConvidado === id) {
                        evento.convidados.pull(convidado);
                        await evento.updateOne(evento);
                    }
                };
            }
            for (const idevento of user.EventosAdm) {
                await deleteEventoService(idevento);
                }
            await userServices.deleteUserService(id);
            return res.status(200).json({ message: "Usuário deletado com sucesso" });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
module.exports = { updateUser, findAllUsers, findUserById, findUser, deleteUser };