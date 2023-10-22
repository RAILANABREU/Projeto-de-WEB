const router = require('express').Router();
const recuperacaoSenhaController = require('../controller/recuperacaoSenha.controller');

router.post('/forgot_password', recuperacaoSenhaController.recuperacaoSenha);

module.exports = router;