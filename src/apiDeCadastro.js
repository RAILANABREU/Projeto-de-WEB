const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const users = [];

app.post('/api/novo-usuario/v1', async (req, res) => {
    const { name, sobrenome, email, telefone, senha } = req.body;
}

if (!nome || !sobrenome || !email || !telefone || !senha || !confrimarSenha) {
    return res.status(400).json({ error: 'Campos obrigatórios' })
}
if (senha !== confrimarSenha) {
    return res.status(404).json({ error: 'Senhas diferentes' })
}
try{
    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = { nome, sobrenome, email, telefone, senha: senhaHash };

    users.push(novoUsuario);

    return res.status(201).json({ message: 'Usuário criado com sucesso!' });
} catch (error) {
    return res.status(400).json({ error: 'Erro ao cadastrar usuário' });
});




