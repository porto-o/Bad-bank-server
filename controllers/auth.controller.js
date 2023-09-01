const Customer = require("../models/customer.model.js");
const bcrypt = require("bcryptjs");
const createAccessToken = require("../libs/jwt.js");

const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    // encrypt password
    const hashPassword = await bcrypt.hash(password, 10);

    // This customer is saved to the server only
    const newCustomer = new Customer({
        username,
        email,
        password: hashPassword,
    });

    try {
        // Save in the database
        const savedCustomer = await newCustomer.save();

        // create a token and send it to the client
        const token = await createAccessToken({ id: savedCustomer._id });
        res.cookie("token", token);

        res.json({
            id: savedCustomer._id,
            username: savedCustomer.username,
            email: savedCustomer.email,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const signIn = async (req, res) => {
    const { email, password } = req.body;

    // Find an email
    const customerFound = await Customer.findOne({ email });
    if (!customerFound)
        return res.status(400).json({ message: "Invalid credentials" });

    // compare password
    const isMatch = await bcrypt.compare(password, customerFound.password);

    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    try {
        // create a token and send it to the client
        const token = await createAccessToken({ id: customerFound._id });
        res.cookie("token", token);

        res.json({
            id: customerFound._id,
            username: customerFound.username,
            email: customerFound.email,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const signOut = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
};

const myHistory = (req, res) => {
    console.log(req.user)
    res.send('myHistory')
}

module.exports = {
    signUp,
    signIn,
    signOut,
    myHistory
};
