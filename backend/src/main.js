const express = require('express');
const app = express();
const userRouter = require("./app/router/user.router");
const loginRouter = require("./app/router/login.router");
const eventoRouter = require("./app/router/evento.router");
const pictureRouter = require("./app/router/picture.router");
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});

const conectDatabase = require("./dataBase/db");

const port = 3000;

conectDatabase();
app.use(express.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use("/evento", eventoRouter);
app.use("/picture", pictureRouter);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));





