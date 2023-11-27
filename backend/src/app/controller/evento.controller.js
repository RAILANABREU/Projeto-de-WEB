const eventoService = require("../services/evento.service");
const userService = require("../services/user.service");

const createEvento = async (req, res) => {
    const { admID, titulo} = req.body;
// no caso o admID é o ID do admin!!
    if (!admID || !titulo ) {
        return res.status(400).json({ error: "Preencha todos os campos" });
    }
    const user = await userService.findUserByIdService(admID);
    
    if (!user) {
        return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const eventoExistente = await eventoService.findEventoService(titulo);

    if (eventoExistente) {
        return res.status(400).json({ error: "Evento já cadastrado" });
    }

    try {
        const evento = await eventoService.createEventoService(req.body);
        evento.admID = user._id;
        evento.updateOne(evento);
        user.isAdm = true;
        user.EventosAdm.push(evento);
        await user.updateOne(user);
        return res.status(201).json({ evento });
        
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const findAllEventoService = async (req, res) => {
    try {
        const evento = await eventoService.findAllEventoService();
        return res.status(200).json({ evento });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const findEventoByIdService = async (req, res) => {
    const { id } = req.params;
    try {
        const evento = await eventoService.findEventoByIdService(id);
        return res.status(200).json({ message: "Evento encontrado"
            ,evento });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const findEventoService = async (req, res) => {
    const { titulo } = req.body;
    try {
        const evento = await eventoService.findEventoService(titulo);
        if (!evento) {
            return res.status(400).json({ message: "Evento não encontrado" });
        }
        return res.status(200).json({ message: "Evento encontrado"
            , evento });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}




const updateEvento = async (req, res) => {
    try {
        const evento = await eventoService.findEventoService(req.body.titulo);
        if (!evento) {
            return res.status(400).json({ message: "Evento não encontrado" });
        }
        if (req.body.titulo) {
            evento.titulo = req.body.titulo;
        }
        if (req.body.descricao) {
            evento.descricao = req.body.descricao;
        }
        if (req.body.data) {
            evento.data = req.body.data;
        }
        if (req.body.horario) {
            evento.horario = req.body.horario;
        }
        if (req.body.local) {
            evento.local = req.body.local;
        }
        if (req.body.valor) {
            evento.valor = req.body.valor;
        }
        if (req.body.imagem) {
            evento.imagem = req.body.imagem;
        }
        if (req.body.convidados) {
            evento.convidados = req.body.convidados;
        }
        if (req.body.gastos) {
            if (req.body.gastos.total) {
                evento.gastos.total = req.body.gastos.total;
        }
        if (req.body.pix) {
            evento.pix = req.body.pix;
        }

        await evento.updateOne(evento);
        res.status(200).send({
            message: "Evento atualizado com sucesso",
            evento,
        });
    
    }}catch (error) {
        res.status(400).send({ message: "Não foi possível atualizar o evento" });
        return;
    }
};

const incluirGasto = async (req, res) => {
    const { idEvento, gasto } = req.body;

    try {
        const evento = await eventoService.findEventoByIdService(idEvento);
        if (!evento) {
            return res.status(400).json({ message: "Evento não encontrado" });
        }
        evento.gastos.total = evento.gastos.total + gasto.valor;
        evento.gastos.gasto.push(gasto);
        await evento.updateOne(evento);
        res.status(200).send({
            message: "Gasto incluido com sucesso",
            gastos:evento.gastos,
        });
    } catch (error) {
        res.status(400).send({ message: "Não foi possível incluir o gasto" });
        return;
    }
}

const excluirGasto = async (req, res) => {
    const { idEvento, idGasto } = req.body;

    try {
        const evento = await eventoService.findEventoByIdService(idEvento);
        if (!evento) {
            return res.status(400).json({ message: "Evento não encontrado" });
        }
        const gasto = evento.gastos.gasto.id(idGasto);
        if (!gasto) {
            return res.status(400).json({ message: "Gasto não encontrado" });
        }
        evento.gastos.total = evento.gastos.total - gasto.valor;
        evento.gastos.gasto.pull(gasto);
        await evento.updateOne(evento);
        res.status(200).send({
            message: "Gasto excluido com sucesso",
            gastos:evento.gastos,
        });
    } catch (error) {
        res.status(400).send({ message: "Não foi possível excluir o gasto" });
        return;
    }
}

const sairEvento = async (req, res) => {
    const { titulo, username } = req.body;
    
    try {
        const evento = await eventoService.findEventoService(titulo);
        if (!evento) {
            return res.status(400).json({ message: "Evento não encontrado" });
        }
        const user = await userService.findUserService(username);
        if (!user) {
            return res.status(400).json({ message: "Usuário não encontrado" });
        }
        user.admEvento.pull(evento);
        user.participaEvento.pull(evento);
        await user.updateOne(user);
        res.status(200).send({
            message: "Usuário removido do evento",
        });
    } catch (error) {
        res.status(400).send({ message: "Não foi possível remover o usuário" });
        return;
    }
}

const deleteEventoService = async (req, res) => {
    const { id } = req.params;
    try {
        const evento = await eventoService.findEventoByIdService(id);
        if (!evento) {
            return res.status(400).json({ message: "Evento não encontrado" });
        }
        const users = await userService.findAllUserService();
        users.forEach(async (user) => {
            user.EventosAdm.pull(evento);
            user.eventosConfirmados.pull(evento);
            user.convites.pull(evento);
            await user.updateOne(user);
        });

        await eventoService.deleteEventoService(id);
        return res.status(200).json({ message: "Evento excluído com sucesso" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = { createEvento, findAllEventoService, findEventoByIdService, findEventoService, deleteEventoService, updateEvento, sairEvento, incluirGasto, excluirGasto };

