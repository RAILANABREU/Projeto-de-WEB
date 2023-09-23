const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

function titleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
        return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
}
const userSchema = new mongoose.Schema({
    nome: { type: String, required: true, lowercase: true, trim: true, set: titleCase },
    sobrenome: { type: String, required: true , lowercase: true, trim: true, set: titleCase },
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
userSchema.pre('validate', async function(next) {
    const existingUser = await this.constructor.findOne({ username: this.username });
    if (existingUser) {
        const error = new Error('Username já está em uso');
        next(error);
    } else {
        next();
    }});


const userModel = mongoose.model('user', userSchema);

module.exports = userModel;