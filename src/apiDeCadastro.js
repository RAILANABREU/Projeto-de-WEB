const express = require('express');
const app = express();
const userRouter = require("./router/user.router");
const port = 3000;

app.use(express.json());
app.use("/cadastro", userRouter);


app.listen(port, () => console.log(`Servidor rodando na porta ${port }`))




