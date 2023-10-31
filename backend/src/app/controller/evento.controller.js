const eventoService = require("../services/evento.service");
#
#

const auth = async (req, res) => {
    const { titulo, descricao } = req.body;
    try {
        console.log(titulo);
        const evento = await eventoService.CreateEventoService(titulo);
        console.log(evento);
        if (!evento) {
            return res.status(401).send({ error: "Evento não foi criado" });
        }
        if (!(await bcrypt.compare(senha, user.senha))) {
            return res.status(401).send({ error: "Senha inválida" });
        }
        user.senha = undefined;


