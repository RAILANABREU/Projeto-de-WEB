const router = require('express').Router();
const loginController = require("../controller/login.controller");

router.post('/', loginController.auth);

module.exports = router;