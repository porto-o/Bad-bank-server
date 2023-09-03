const Customer = require("../models/customer.model.js");
const bcrypt = require("bcryptjs");
const createAccessToken = require("../libs/jwt.js");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    const userFound = await Customer.findOne({ email });
    if (userFound)
        return res.status(400).json(["Email already exists"]);

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
        // save it in the cookie.token
        res.cookie("token", token);

        res.json({
            id: savedCustomer._id,
            username: savedCustomer.username,
            email: savedCustomer.email,
            transactions: savedCustomer.transactions,
            balance: savedCustomer.balance,
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
            balance: customerFound.balance,
            transactions: customerFound.transactions,
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

const verifyToken = async (req, res) => {
    const { token } = req.cookies
    if (!token) return res.sendStatus(401).json({ message: "Unauthorized" })

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.sendStatus(401).json({ message: "Unauthorized" })

        const customerFound = await Customer.findById(decoded.id)
        if (!customerFound) return res.sendStatus(401).json({ message: "Unauthorized" })

        res.json({
            id: customerFound._id,
            username: customerFound.username,
            email: customerFound.email,
            balance: customerFound.balance,
            transactions: customerFound.transactions,
        });
    })
}

module.exports = {
    signUp,
    signIn,
    signOut,
    verifyToken
};
