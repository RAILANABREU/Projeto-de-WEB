const eventoService = require("../services/evento.service");

const createEvento = async (req, res) => {
    const { titulo, descricao, data, horario, local, valor, imagem } = req.body;

    if (!titulo || !descricao || !data || !horario || !local ) {
        return res.status(400).json({ error: "Preencha todos os campos" });
    }

    try {
        const evento = await eventoService.createEventoService(req.body);
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
        return res.status(200).json({ evento });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const findEventoService = async (req, res) => {
    const { titulo } = req.body;
    try {
        const evento = await eventoService.findEventoService(req.body);
        return res.status(200).json({ evento });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


const deleteEventoService = async (req, res) => {
    const { id } = req.params;
    try {
        const evento = await eventoService.deleteEventoService(id);
        return res.status(200).json({ evento });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}



module.exports = { createEvento, findAllEventoService, findEventoByIdService, findEventoService, deleteEventoService };