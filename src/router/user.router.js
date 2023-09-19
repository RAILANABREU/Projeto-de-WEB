const router = require('express').Router();
const userController = require('../controller/user.controller');


router.post('/', userController.login);   


module.exports = router;