const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const data = require('../data/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.get('/',  function (req, res) {
    console.time()
    setTimeout(() => {
        res.status(200).jsonp(data())
    }, 3000);
    console.timeEnd()
});


//ServiceA
let port = 3001;
app.listen(port, () => {
 console.log('Service A em execução na porta: ' + port);
});