const express = require("express");
const logger = require("morgan");
const http = require("http");
const path = require("path");

const app = express();

// logger middlewares
app.use(logger("short"));

// static files
const publicPath = path.resolve(__dirname, "public"); // setup the public path
app.use(express.static(publicPath)); // send static files from public path

app.use((req, _, next) => {
  console.log("In comes a " + req.method + " to " + req.url);
  next();
});

app.use((_, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Looks like you didn't find a static file.");
  // next();
});

app.use((_, res, next) => {
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
