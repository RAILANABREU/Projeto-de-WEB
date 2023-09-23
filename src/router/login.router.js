const router = require('express').Router();
const loginController = require('../controller/login.controller');

router.get('/', loginController.findLogin);

module.exports = router;