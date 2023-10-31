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

module.exports = { createEvento };