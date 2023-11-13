const eventoService = require("../services/evento.service");
const userService = require("../services/user.service");

// esta aplicacao se refere a enviar um convite pde um evento para um usuario da plataforma, este convite so pode ser feito pelo adm do evento.
// o adm do evento deve informar o id do evento e o id do usuario que ele deseja convidar

// o usuario que receber o convite deve aceitar ou recusar o convite, caso aceite ele passa a ser um participante do evento

const enviarConvite = async (req, res) => {
    const {
        idEvento,
        adm,
        convidado,
    } = req.body;

    if (!idEvento || !convidado || !adm) {
        res.status(400).send({
        message: "Todos os campos são obrigatórios"
        });
        return;
    }

    try {
        const userAdm = await userService.findUser(adm);

        if (!userAdm) {
        res.status(400).send({
            message: "Não foi possível encontrar o usuário"
        });
        return;
        }

        const evento = await eventoService.findEventoByIdService(idEvento);

        if (!evento) {
            res.status(400).send({
                message: "Não foi possível encontrar o evento"
            });
            return;
        }

        if (evento.adm !== userAdm.username) {
            res.status(400).send({
                message: "Você não é o adm do evento"
            });
            return;
        
        }
        const user = await userService.findUser(convidado);

        if (!user) {
            res.status(400).send({
                message: "Não foi possível encontrar o usuário"
            });
            return;
        }
        try {
            user.convites = evento;
            await user.updateOne(user);
            res.status(200).send({
                message: "Convite enviado com sucesso",
                user
                });
            } catch (error) {
                console.error(error);
                // Aqui você pode imprimir o erro para debug ou tratá-lo de outra forma
            }
    }
    catch (error) {
        res.status(400).send({
        message: "Não foi possível encontrar o usuário"
        });
        return;
    }
    
    }



module.exports = { enviarConvite };
