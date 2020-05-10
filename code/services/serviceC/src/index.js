const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const data = require('../data/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.get('/',  function (req, res) {    
        res.status(200).jsonp(data())
});


//ServiceC
let port = 3003;
app.listen(port, () => {
 console.log('Service C em execução na porta: ' + port);
});