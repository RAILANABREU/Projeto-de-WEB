const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
    titulo: { type: String, required: true, unique: true },
    descricao: { type: String, required: false },
    data: { type: String, required: true },
    horario: { type: String, required: true },
    local: { type: String, required: true },
    valor: { type: String, required: false },
    imagem: { type: String, required: false },
    pix: { type: String, required: false },
});

const eventoModel = mongoose.model('evento', eventoSchema);

module.exports = eventoModel;