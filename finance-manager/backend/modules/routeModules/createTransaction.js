const {calculateSubtotal} = require("../calculateSubtotal");

function createTransaction(db, req, res) {

    const { type, value } = req.body
    db.run("INSERT INTO transactions (type, value) VALUES (?, ?)", [type, value], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message })
        }

        calculateSubtotal(db)
        res.json({
            id: this.lastID,
            type,
            value
        })
    })

}

module.exports = {createTransaction}