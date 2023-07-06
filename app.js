const express = require("express");
const http = require("http");
const app = express();

app.use((req, res, next) => {
  console.log("In comes a " + req.method + " to " + req.url);
  next();
});

app.use((req, res, next) => {
  const minutes = new Date().getMinutes();
  if (minutes % 2 === 0) {
    next();
  } else {
    res.statusCode = 403;
    res.end("Not authorized");
  }
});

app.use((req, res) => {
  res.end('Secret info: the password is "swordfish"!');
});

// run
http
  .createServer(app)
  .listen(3000)
  .on("listening", () => {
    console.log("Listening on localhost:3000");
  });
