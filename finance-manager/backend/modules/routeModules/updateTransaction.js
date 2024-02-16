const {calculateSubtotal} = require("../calculateSubtotal");
const {initDatabase} = require("../dbCreator");

function updateTransaction (req, res) {

    const db = initDatabase()

    const { id } = req.params
    const { type, value } = req.body
    const updateTransactionQuery = 'UPDATE transactions SET type = ?, value = ? WHERE id = ?'


    db.run(updateTransactionQuery, [type, value, id], (err) => {

        if (err) {db.close(); return res.status(500).json({error: "Transaction update failed"})}

        calculateSubtotal()

        res.json({ message: `Transactions ${id} successfully updated` })
        db.close()
    })

}

module.exports = {updateTransaction}