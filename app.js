var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors'); // Importation du package cors


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const ClientController = require('./controllers/ClientController');
const PassKeyController = require('./controllers/PassKeyController');
const RestaurantController = require('./controllers/RestaurantController');
const PlatController = require('./controllers/PlatController');





var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(
    '/client',
    (req, res, next) => {
      console.log("__ClientController________________________________")
      next()
    }, ClientController
);

app.use(
    '/passkey',
    (req, res, next) => {
      console.log("__PassKeyController________________________________")
      next()
    }, PassKeyController
);

app.use(
    '/restaurant',
    (req, res, next) => {
      console.log("__RestaurantController________________________________")
      next()
    }, RestaurantController
);

app.use(
    '/plat',
    (req, res, next) => {
      console.log("__PlatController________________________________")
      next()
    }, PlatController
);

module.exports = app;
