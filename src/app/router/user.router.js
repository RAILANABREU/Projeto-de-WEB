const router = require('express').Router();
const userController = require('../controller/register.controller');


router.post('/register', userController.user);  
router.get('/find', userController.findAllUsers); 


module.exports = router;