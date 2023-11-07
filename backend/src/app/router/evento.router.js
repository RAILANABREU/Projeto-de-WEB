const router = require('express').Router();
const eventoController = require("../controller/evento.controller");

router.post('/create',eventoController.createEvento);
router.get('/findAll',eventoController.findAllEventoService);
router.get('/find/:id',eventoController.findEventoByIdService);
router.delete('/delete/:id',eventoController.deleteEventoService);


module.exports = router;