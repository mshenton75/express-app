var config = {}

var express = require('express');
//var ////createErrors = require('http-errors')
var path = require('path');
require('dotenv').config();
var logger = require('morgan');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//var cookieParser = require('cookie-parser');


module.exports = app
