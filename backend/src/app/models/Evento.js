const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
    titulo: { type: String, required: true, unique: true },
    descricao: { type: String, required: false },
    data: { type: String, required: true },
    horario: { type: String, required: true },
    local: { type: String, required: true },
    valor: { type: String, required: false },
    imagem: { type: String, required: false },
    convidados: [{
        username: { type: String, required: false },
        jaPagou: { type: Boolean, required: false, select: false, default: false },
        confirmado: { type: Boolean, required: false, select: false, default: false }}],
    pix: { type: String, required: false },
});

const eventoModel = mongoose.model('evento', eventoSchema);

module.exports = eventoModel;