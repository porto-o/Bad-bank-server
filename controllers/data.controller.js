const Customer = require("../models/customer.model.js");

const getData = async (req, res) => {

    // this endpoint will return the transaction history for each user

    const userFound = await Customer.findById(req.user.id);

    if (!userFound) return res.status(404).json({ message: "User not found" })

    // return the json of transacitons
    res.json(userFound.transactions)

}

const operation = async (req, res) => {
    // this endpoint will return the transaction history for each user
    let { operation, amount } = req.body;
    console.log(amount)
    // parse the amount to number
    amount = Number(amount);

    const customerFound = await Customer.findById(req.user.id);

    if (!customerFound) return res.status(404).json({ message: "User not found" })

    operation === "withdraw" ? customerFound.balance -= amount : customerFound.balance += amount;

    customerFound.transactions.push({
        type: operation === "withdraw" ? "withdrawal" : "deposit",
        amount: amount,
        date: Date.now()
    })

    // save to the database
    await customerFound.save();
    // return the json of transacitons
    res.json({
        transactions: customerFound.transactions,
        balance: customerFound.balance,
        message: "Transaction successful"
    })


}

const transfer = async (req, res) => {
    // search a user to transfer with the email
    // 
    let { email, amount } = req.body;
    amount = Number(amount);


    const customerFound = await Customer.findById(req.user.id);

    if (!customerFound) return res.status(404).json({ message: "User not found" })

    // check if the user has enough money

    if (customerFound.balance < amount) return res.status(400).json({ message: "Insufficient funds" })

    // check if the email is valid
    const userFound = await Customer.findOne({ email });

    if (!userFound) return res.status(404).json({ message: "User not found" })

    // check if the user is the same as the one logged in

    if (userFound._id.toString() === customerFound._id.toString()) return res.status(400).json({ message: "You can't transfer money to yourself" })
    // transfer the money
    // convert amount to number
    customerFound.balance -= amount;
    userFound.balance += amount;
    // save to the database

    // add to the transaction history of both users
    customerFound.transactions.push({
        type: "transfer",
        amount: amount,
        date: Date.now(),
        email: email
    })

    userFound.transactions.push({
        type: "received",
        amount: amount,
        date: Date.now(),
        email: customerFound.email
    })

    await customerFound.save();
    await userFound.save();
    // return the json of transacitons
    res.json({
        transactions: customerFound.transactions,
        balance: customerFound.balance,
        message: "Transaction successful"

    })
}

module.exports = {
    getData,
    operation,
    transfer

}