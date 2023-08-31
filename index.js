const express = require("express");
const app = express();
const customer = require("./routes/customer.js");

app.use(express.json());

app.set('appName', 'BadBank server');

app.use('/customer', customer)

app.listen(3000, () => console.log("Server running on port 3000"));
