const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PictureSchema = new Schema({
    name: { type: String, required: true },
    src: { type: String, required: true },
    refernciaEvento: { type: Schema.Types.ObjectId, ref: 'Evento', required: false },
    refernciaUser: { type: Schema.Types.ObjectId, ref: 'Usuario', required: false  },
});

module.exports = mongoose.model('Picture', PictureSchema);