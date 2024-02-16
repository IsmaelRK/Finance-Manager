const {calculateSubtotal} = require("../calculateSubtotal");
const {initDatabase} = require("../dbCreator");

function createTransaction(req, res) {

    const db = initDatabase()
    const { type, value } = req.body

    const insertTransactionQuery= 'INSERT INTO transactions (type, value) VALUES (?, ?)'
    db.run(insertTransactionQuery, [type, value], function(err) {

        if (err) {db.close(); return res.status(500).json({ error: "Insert Transaction Failed" })}

        calculateSubtotal()
        res.json({
            id: this.lastID,
            type,
            value
        })

        db.close()
    })


}

module.exports = {createTransaction}