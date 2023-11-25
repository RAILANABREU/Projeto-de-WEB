const router = require('express').Router();
const eventoController = require("../controller/evento.controller");
const conviteController = require("../controller/convite.controller");
const authToken = require("../middlewares/auth.middlewere");

router.post('/create', authToken ,eventoController.createEvento);
router.get('/findAll', authToken ,eventoController.findAllEventoService);
router.get('/find/:id',authToken ,eventoController.findEventoByIdService);
router.delete('/delete/:id',authToken ,eventoController.deleteEventoService);
router.post('/find',authToken ,eventoController.findEventoService);
router.post('/invite', authToken ,conviteController.enviarConvite);
router.post('/accept', authToken ,conviteController.aceitarConvite);
router.post('/update', authToken ,eventoController.updateEvento);
router.post('/incluirgasto', authToken ,eventoController.incluirGasto);
router.post('/excluirgasto', authToken ,eventoController.excluirGasto);


module.exports = router;