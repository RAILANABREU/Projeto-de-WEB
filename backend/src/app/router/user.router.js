const router = require('express').Router();
const registerController = require('../controller/register.controller');
const resetSenha = require('../controller/recuperacaoSenha.controller');
const userController = require('../controller/user.controller');


router.post('/register', registerController.createUser); 
router.post('/recuperarSenha', resetSenha.recuperarSenha); 
router.post('/forgotPasswordToken', resetSenha.recuperarSenha);
router.post('/resetPassword', resetSenha.resetarSenha);
router.post('/update', userController.updateUser);
router.get('/findAll', userController.findAllUsers);
router.get('/find/:id', userController.findUserById);
router.get('/findUserById', userController.findUserById);
router.post('/updateUser', userController.updateUser);
router.post('/find', userController.findUser);


module.exports = router;