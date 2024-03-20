const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const connectDB = require('./db');
const multer = require('multer');
const signuprouter = require('./signup');
const loginrouter = require('./login');
const personalizerouter = require('./personalize');
const formidable = require('formidable');

const app = express();
app.use(cors());
// const upload = multer();
// app.use(upload.any());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




connectDB();


app.use('/api/signup', signuprouter);
app.use('/api/login', loginrouter);
app.use('/api/personalize', personalizerouter);

module.exports = app;
