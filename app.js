const express = require('express');
const morgan = require('morgan');
const authRoutes = require('./routes/auth.routes.js');
const dataRoutes = require('./routes/data.routes.js');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
dotenv.config();

// cors must allow all origins to access the server
const whitelist = [process.env.FRONT_URI]
const corsOptions = {
    origin: (origin, callback) => {
        console.log(origin);
        if (whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions, {
    credentials: true,
    cookies: true
}))

// midleware to parse the req. body to a json object
app.use(cookieParser());

app.use(express.json());
// to parse cookies

// use morgan module to watch requests and the responses
app.use(morgan('dev'));

app.use('/api', authRoutes);
app.use('/api', dataRoutes);

module.exports = app;