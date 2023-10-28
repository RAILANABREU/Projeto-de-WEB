const router = require('express').Router();
const loginController = require("../app/controller/login.controller");

router.get('/', loginController.auth);

module.exports = router;