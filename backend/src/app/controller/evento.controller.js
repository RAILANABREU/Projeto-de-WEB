const eventoService = require("../services/evento.service");
const userService = require("../services/user.service");

const createEvento = async (req, res) => {
    const { adm, titulo, descricao, data, horario, local, valor, imagem,convidados,gastos,confirmado, pix } = req.body;
// no caso o adm é o ID do admin!!
    if (!adm || !titulo || !descricao || !pix) {
        return res.status(400).json({ error: "Preencha todos os campos" });
    }
    console.log(req.body);
    const user = await userService.findUserByIdService(adm);
    console.log(user);
    if (!user) {
        return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const eventoExistente = await eventoService.findEventoService(titulo);

    if (eventoExistente) {
        return res.status(400).json({ error: "Evento já cadastrado" });
    }

    try {
        const evento = await eventoService.createEventoService(req.body);
        evento.adm = user.username;
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


const deleteEventoService = async (req, res) => {
    const { id } = req.params;
    try {
        const evento = await eventoService.deleteEventoService(id);
        return res.status(200).json({ message: "Evento deletado com sucesso" });
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
    const { titulo, gasto } = req.body;

    try {
        const evento = await eventoService.findEventoService(titulo);
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

module.exports = { createEvento, findAllEventoService, findEventoByIdService, findEventoService, deleteEventoService, updateEvento,sairEvento, incluirGasto };

