const {calculateSubtotal} = require("../calculateSubtotal");
const {initDatabase} = require("../dbCreator");

function createTransaction(req, res) {

    const db = initDatabase()
    const { type, value } = req.body

    const insertTransactionQuery= 'INSERT INTO transactions (type, value) VALUES (?, ?)'

    try {
        db.run(insertTransactionQuery, [type, value], function(err) {
            if (err) {throw err}

            calculateSubtotal()
            res.json({
                id: this.lastID,
                type,
                value
            })
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    } finally {
        db.close()
    }

}

module.exports = {createTransaction}