const router = require('express').Router();
const userController = require('../controller/register.controller');
const recuperarSenha = require('../controller/recuperacaoSenha.controller');


router.post('/register', userController.user);  
router.get('/find', userController.findAllUsers);
router.post('/recuperarSenha', recuperarSenha.recuperarSenha); 


module.exports = router;