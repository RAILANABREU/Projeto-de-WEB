const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
    admID: { type: String, required: true, lowercase: true, trim: true},
    titulo: { type: String, required: true, unique: true },
    descricao: { type: String, required: false },
    data: { type: String, required: false },
    horario: { type: String, required: false },
    local: { type: String, required: false },
    valor: { type: String, required: false },
    imagem: { type: String, required: false },
    convidados: [],
    gastos: {
        total: { type: Number, required: false, default: 0 },
        gasto: [{
            nome: { type: String, required: false },
            valor: { type: Number, required: false },
            descricao: { type: String, required: false },
            local: { type: String, required: false },
            comprovante: { type: String, required: false },

        }]
    },
    pix: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    confirmado: { type: Boolean, required: false, select: false, default: true },
});

const eventoModel = mongoose.model('evento', eventoSchema);

module.exports = eventoModel;