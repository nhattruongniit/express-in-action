const express = require("express");
const logger = require("morgan");
const http = require("http");
const path = require("path");
const bodyParser = require('body-parser');

const app = express();

app.use(logger("dev")); // use morgan to log every request
app.use(bodyParser.urlencoded({
  extended: false
})); // use body-parser to parse the body of the request

app.use('/guest-book', require('./guest-book/app'));

// start server on port 3000
http.createServer(app).listen(3000, () => {
  console.log('Guestbook app started on port 3000.');
})