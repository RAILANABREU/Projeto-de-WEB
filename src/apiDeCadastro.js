const express = require('express');
const app = express();
const userRouter = require("./router/user.router");
const bodyParser = require('body-parser');


app.use("/login", userRouter);
app.use(bodyParser.json());

app.listen(3000, () => console.log(`Servidor rodando na porta }`))




