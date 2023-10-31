const router = require('express').Router();
const eventoController = require("../controller/evento.controller");

router.get('/create',eventoController.createEvento);

module.exports = router;