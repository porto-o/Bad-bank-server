const express = require('express');
const morgan = require('morgan');
const authRoutes = require('./routes/auth.routes.js');
const dataRoutes = require('./routes/data.routes.js');
const cookieParser = require('cookie-parser')

const app = express();

// midleware to parse the req. body to a json object
app.use(express.json());
// to parse cookies
app.use(cookieParser());

// use morgan module to watch requests and the responses
app.use(morgan('dev'));

app.use('/api', authRoutes);
app.use('/api', dataRoutes);

module.exports = app;