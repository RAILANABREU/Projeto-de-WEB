const router = require('express').Router();
const eventoController = require("../controller/evento.controller");

router.post('/create',eventoController.createEvento);

module.exports = router;