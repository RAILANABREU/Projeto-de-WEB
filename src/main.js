const express = require('express');
const app = express();
const userRouter = require("./router/user.router");
const loginRouter = require("./router/login.router");

const conectDatabase = require("./dataBase/db");

const port = 3000;

conectDatabase();
app.use(express.json());
app.use("/user", userRouter);
app.use("/login", loginRouter);

require("./controller/project.controller")(app);

app.listen(port, () => console.log(`Servidor rodando na porta ${port }`))




