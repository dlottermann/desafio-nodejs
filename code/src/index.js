const express = require('express');
const httpProxy = require('express-http-proxy');
const app = express();
const port = 3000;


const serviceA = httpProxy('http://localhost:3001');
const serviceB = httpProxy('http://localhost:3002');
const serviceC = httpProxy('http://localhost:3003');

app.get('/', (req, res) => {
    res.send('Gateway API Rodando...')
});

app.use('/service-a', (req, res, next) => serviceA(req, res, next));
app.use('/service-b', (req, res, next) => serviceB(req, res, next));
app.use('/service-c', (req, res, next) => serviceC(req, res, next));

app.listen(port, () => console.log(`API Gateway rodando na porta ${port}!`));
