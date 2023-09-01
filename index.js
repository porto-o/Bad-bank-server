const app = require('./app.js');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB.js');

// Enable .env file to be use
dotenv.config();

// getting the port from .env file
const port = process.env.PORT || 4000;

// Connect to database
connectDB();


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})


// dotenv.config();

// app.use(express.json());

// // import port from .env file

// const port = process.env.PORT || 4000;

// connectDB()

// app.set('appName', 'BadBank server');

// app.use('/customer', middleware, customer)

// app.listen(port, () => console.log(`Server running on port ${port}`));
