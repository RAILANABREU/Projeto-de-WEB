const router = require('express').Router();
const userController = require('../controller/register.controller');
const resetSenha = require('../controller/recuperacaoSenha.controller');


router.post('/register', userController.user);  
router.get('/find', userController.findAllUsers);
router.post('/recuperarSenha', resetSenha.recuperarSenha); 
router.post('/forgotPasswordToken', resetSenha.recuperarSenha);
router.post('/resetPassword', resetSenha.resetarSenha);

module.exports = router;