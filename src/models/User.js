const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    telefone: { type: String, required: true },
    senha: { type: String, required: true },
    avatar: { type: String, required: true }
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;