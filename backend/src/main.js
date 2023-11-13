const express = require('express');
const app = express();
const userRouter = require("./app/router/user.router");
const loginRouter = require("./app/router/login.router");
const eventoRouter = require("./app/router/evento.router");
const cors = require('cors');

app.use(cors());

const conectDatabase = require("./dataBase/db");

const port = 3000;

conectDatabase();
app.use(express.json());
app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use("/evento", eventoRouter);

app.listen(port, () => console.log(`Servidor rodando na porta ${port }`))




