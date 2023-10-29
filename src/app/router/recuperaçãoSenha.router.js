const router = require('express').Router();
const recuperacaoSenhaController = require('../controller/recuperacaoSenha.controller');

router.post('/forgot_password_token', recuperacaoSenhaController.recuperacaoSenha);
router.post('/reset_password', recuperacaoSenhaController.resetSenha);

module.exports = router;