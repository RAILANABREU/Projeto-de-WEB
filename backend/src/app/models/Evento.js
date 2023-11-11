const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
    adm: { type: String, required: true, lowercase: true, trim: true},
    titulo: { type: String, required: true, unique: true },
    descricao: { type: String, required: false },
    data: { type: String, required: true },
    horario: { type: String, required: true },
    local: { type: String, required: true },
    valor: { type: String, required: false },
    imagem: { type: String, required: false },
    convidados: [],
    pix: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    confirmado: { type: Boolean, required: false, select: false, default: true },
});

const eventoModel = mongoose.model('evento', eventoSchema);

module.exports = eventoModel;