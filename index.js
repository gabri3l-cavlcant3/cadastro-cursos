const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Página inicial');
});

app.get('/sobre', (req, res) => {
    res.send('Esta é a página sobre');
});

app.get('/cursos', (req, res) => {
    const cursos = require('./public/cursos.json');
    res.json(cursos);
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});