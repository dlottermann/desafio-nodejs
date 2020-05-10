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
    }, 1500);
    console.timeEnd()
});


//ServiceB
let port = 3002;
app.listen(port, () => {
 console.log('ServiceB em execução na porta: ' + port);
});