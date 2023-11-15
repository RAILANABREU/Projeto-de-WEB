const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PictureSchema = new Schema({
    name: { type: String, required: true },
    src: { type: String, required: true },
    refernciaEvento: { type: String, required: false },
    refernciaUser: { type: String, required: false  },
});

module.exports = mongoose.model('Picture', PictureSchema);