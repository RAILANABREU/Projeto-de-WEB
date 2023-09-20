const express = require('express');
const app = express();
const userRouter = require("./router/user.router");

const conectDatabase = require("./dataBase/db");

const port = 3000;

conectDatabase();
app.use(express.json());
app.use("/cadastro", userRouter);


app.listen(port, () => console.log(`Servidor rodando na porta ${port }`))




