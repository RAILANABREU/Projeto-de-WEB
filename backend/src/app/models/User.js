const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    nome: { type: String, required: true, lowercase: true, trim: true },
    sobrenome: { type: String, required: true , lowercase: true, trim: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    telefone: { type: String, required: true, trim: true },
    senha: { type: String, required: true, select: false, trim: true },
    avatar: { type: String , trim: true},
    createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;