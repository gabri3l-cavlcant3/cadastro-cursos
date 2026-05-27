const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());

app.use(cors({
    origin: '*'
}));

app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.get('/sobre', (req, res) => {
    res.send('Esta é a página sobre');
});

app.use('/', require('./routes'));

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});