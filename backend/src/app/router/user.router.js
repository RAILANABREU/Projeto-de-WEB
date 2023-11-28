const router = require('express').Router();
const registerController = require('../controller/register.controller');
const resetSenha = require('../controller/recuperacaoSenha.controller');
const userController = require('../controller/user.controller');
const authToken = require('../middlewares/auth.middlewere');


router.post('/register', registerController.createUser); 
router.post('/forgotPasswordToken', resetSenha.recuperarSenha);
router.post('/resetPassword', resetSenha.resetarSenha);
router.post('/update',authToken, userController.updateUser);
router.get('/findAll',authToken, userController.findAllUsers);
router.get('/find/:id',authToken, userController.findUserById);
router.get('/findUserById',authToken, userController.findUserById);
router.post('/updateUser',authToken, userController.updateUser);
router.post('/find',authToken, userController.findUser);
router.delete('/delete/:id',authToken, userController.deleteUser);


module.exports = router;