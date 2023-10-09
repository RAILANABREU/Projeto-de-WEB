const router = require('express').Router();
const userController = require('../app/controller/user.controller');


router.post('/new', userController.user);  
router.get('/find', userController.findAllUsers); 


module.exports = router;