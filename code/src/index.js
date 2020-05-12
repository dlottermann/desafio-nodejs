const express = require("express");
const httpProxy = require("express-http-proxy");
const app = express();
const port = 3000;

const serviceA = httpProxy("http://localhost:3001");
const serviceB = httpProxy("http://localhost:3002");
const serviceC = httpProxy("http://localhost:3003");

app.get("/", (req, res) => {
  res.send("Gateway API Rodando...");
});

app.use("/service-a", (req, res, next) => {
    console.log('authorization',req.headers.authorization)
  if (
    req.headers.authorization != "" &&
    req.headers.authorization != null &&
    req.headers.authorization != "undefined"
  ) {
    serviceA(req, res, next);
  } else {
      res.send('Sem autorização de acesso')
  }
});
app.use("/service-b", (req, res, next) => {
    if (
        req.headers.authorization != "" &&
        req.headers.authorization != null &&
        req.headers.authorization != "undefined"
      ) {
        serviceB(req, res, next)
      } else {
          res.send('Sem autorização de acesso')
      }
    });
app.use("/service-c", (req, res, next) => serviceC(req, res, next));

app.listen(port, () => console.log(`API Gateway rodando na porta ${port}!`));
