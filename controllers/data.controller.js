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
        balance: customerFound.balance
    })


}

module.exports = {
    getData,
    operation

}