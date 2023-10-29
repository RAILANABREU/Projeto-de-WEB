const router = require('express').Router();
const loginController = require("../controller/login.controller");

router.get('/', loginController.auth);

module.exports = router;