const monsgoose = require('mongoose');
const Schema = monsgoose.Schema;

const tokenValido = new Schema({
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
});

const tokenInvalido = new Schema({
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
});


const tokenValidoModel = monsgoose.model('tokenValido', tokenValido);
const tokenInvalidoModel = monsgoose.model('tokenInvalido', tokenInvalido);