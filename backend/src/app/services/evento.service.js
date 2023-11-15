
const Evento = require("../models/Evento");

const createEventoService = (body) => Evento.create(body);

const findAllEventoService = () => Evento.find();

const findEventoByIdService = (id) => Evento.findById(id);

const findEventoService = async (titulo) => Evento.findOne({titulo });

const deleteEventoService = (id) => Evento.findByIdAndDelete(id);

const enviarConvite = async (idEvento, adm, convidado) => Evento.findByIdAndUpdate(convidado, { $push: { convites: evento } }, { new: true });

const aceitarConvite = async (idConvite) => Evento.findByIdAndUpdate(idConvite, { status: "aceito" }, { new: true });

const recusarConvite = async (idConvite) => Evento.findByIdAndUpdate(idConvite, { status: "recusado" }, { new: true });





module.exports = { createEventoService, findAllEventoService, findEventoService, findEventoByIdService, deleteEventoService, aceitarConvite, recusarConvite, enviarConvite };