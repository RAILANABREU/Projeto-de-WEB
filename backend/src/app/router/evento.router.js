const router = require('express').Router();
const eventoController = require("../controller/evento.controller");
const conviteController = require("../controller/convite.controller");

router.post('/create',eventoController.createEvento);
router.get('/findAll',eventoController.findAllEventoService);
router.get('/find/:id',eventoController.findEventoByIdService);
router.delete('/delete/:id',eventoController.deleteEventoService);
router.post('/find',eventoController.findEventoService);
router.post('/invite', conviteController.enviarConvite);

module.exports = router;