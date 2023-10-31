const Evento = require("../models/Evento");

const createEventoService = (body) => Evento.create(body);

const findAllEventoService = () => Evento.find();

const findEventoByIdService = (id) => Evento.findById(id);

const findEventoService = async (body) => Evento.findOne({ titulo: body.titulo });

module.exports = { createEventoService, findAllEventoService, findEventoService, findEventoByIdService };