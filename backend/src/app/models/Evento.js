const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
    titulo: { type: String, required: true, unique: true },
    descricao: { type: String, required: true },
    pix: { type: String, required: false },
});

const eventoModel = mongoose.model('evento', eventoSchema);

module.exports = eventoModel;