const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
});

const loginModel = mongoose.model('login', loginSchema);

module.exports = loginModel;