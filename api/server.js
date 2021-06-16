// Package Import
const express = require('express');
const cors = require('cors');

var bodyParser = require('body-parser');
var path = require ('path');
var gameRouter = require('./routers/game.router')

//app
const app = express();
app.use(cors());

//app.use()
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV == 'development'){
    const morgan = require('morgan');
    app.use(morgan("dev"));
}

//Api(s)
app.use("/api", gameRouter);

//FrontEnd
app.get('/addEdit/:id', (req, res, next) => {
  req.url = `/addEdit.html`;
  express.static(__dirname + `/public/addEdit.html`)(req, res, next);
});
app.get('/view/:id', (req, res, next) => {
  req.url = `/view.html`;
  express.static(__dirname + `/public/view.html`)(req, res, next);
});

app.use("/", express.static("./public"));

//404 route
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

//ERROR Handler
app.use((error, req, res,next) => {

    if (!error.statusCode) error.statusCode = 500;

    return res
      .status(error.statusCode)
      .json({ error: error.toString() });
  });


module.exports = app;