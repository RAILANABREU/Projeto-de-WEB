const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const words = require("../../config/ResetWords.json");

const userSchema = new mongoose.Schema({
    nome: { type: String, required: true, lowercase: true, trim: true },
    sobrenome: { type: String, required: true , lowercase: true, trim: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    telefone: { type: String, required: true, trim: true },
    senha: { type: String, required: true, select: false, trim: true },
    avatar: { type: String , trim: true},
    createdAt: { type: Date, default: Date.now },
    secretWords: { type: String, required: false, trim: true },
});

userSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;
    this.secretWords = words.palavras.sort(() => Math.random() - 0.5).slice(0, 4).join(",");
    next();
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;