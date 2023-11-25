const { copyFile } = require("fs");
const eventoService = require("../services/evento.service");
const userService = require("../services/user.service");

// esta aplicacao se refere a enviar um convite pde um evento para um usuario da plataforma, este convite so pode ser feito pelo adm do evento.
// o adm do evento deve informar o id do evento e o id do usuario que ele deseja convidar

// o usuario que receber o convite deve aceitar ou recusar o convite, caso aceite ele passa a ser um participante do evento

const enviarConvite = async (req, res) => {
    const {
        idEvento,
        idAdm,
        convidado,
    } = req.body;

    if (!idEvento || !convidado || !idAdm) {
        res.status(400).send({
        message: "Todos os campos são obrigatórios"
        });
        return;
    }

    try {
        const userAdm = await userService.findUserByIdService(idAdm);

        if (!userAdm) {
        res.status(400).send({
            message: "Não foi possível encontrar o administrador do evento"
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
        if (evento.admID !== idAdm) {
            res.status(400).send({
                message: "Você não é o adm do evento"
            });
            return;
        
        }
        const user = await userService.findUserService(convidado);

        if (!user) {
            res.status(400).send({
                message: "Não foi possível encontrar o convidado"
            });
            return;
        }
        if (user.username === idAdm) {
            res.status(400).send({
                message: "Você não pode se convidar"
            });
            return;
        }
        //tava tentando fazer a verificação de convite repetido aqui, mas não consegui
        const conviteIndex = user.convites.findIndex(convite => convite._id.toString() === idEvento)
        if (conviteIndex !== -1) {
            res.status(400).send({
                message: "Você já foi convidado para este evento"
            });
            return;
        };
        try {
            user.convites.push(evento);
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
            message: "Erro ao enviar convite"
        });
    }   
    }


    const aceitarConvite = async (req, res) => {
        const { idEvento, idUsuario, confirmar } = req.body;

        if (!idEvento || !idUsuario || !confirmar) {
            res.status(400).send({
                message: "Todos os campos são obrigatórios"
            });
            return;
        }

        try {
            const evento = await eventoService.findEventoByIdService(idEvento);

            if (!evento) {
                res.status(400).send({
                    message: "Não foi possível encontrar o evento"
                });
                return;
            }

            const user = await userService.findUserByIdService(idUsuario);

            if (!user) {
                res.status(400).send({
                    message: "Não foi possível encontrar o usuário"
                });
                return;
            }

            const conviteIndex = user.convites.findIndex(convite => convite._id.toString() === idEvento);

            if (conviteIndex === -1) {
                res.status(400).send({
                    message: "Você não foi convidado para este evento"
                });
                return;
            }

            if (confirmar === "aceito") {
                if(evento.convidados.includes(user.username)){
                    res.status(400).send({
                        message: "Você já está na lista de convidados"
                    });
                    return;
                }else{
                    user.convites[conviteIndex].status = "aceito";
                    evento.convidados.push(user.username);
                    await evento.updateOne(evento);
                }
            } else if (confirmar === "recusado") {
                user.convites[conviteIndex].status = "recusado";
                user.convites.splice(conviteIndex, 1);
                await user.updateOne(user);
            }

            res.status(200).send({
                message: confirmar === "aceito" ? "Convite aceito com sucesso" : "Convite recusado com sucesso",
                user: user.convites
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "Erro ao aceitar convite"
            });
        }
    };

module.exports = { enviarConvite, aceitarConvite };
