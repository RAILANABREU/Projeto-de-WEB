const Evento = require("../models/Evento");

const createEventoService = (evento) => Evento.create(evento);