const {calculateSubtotal} = require("../calculateSubtotal");

function updateTransaction (db, req, res) {

    const { id } = req.params
    const { type, value } = req.body

    const updateTransactionQuery = 'UPDATE transactions SET type = ?, value = ? WHERE id = ?'
    db.run(updateTransactionQuery, [type, value, id], (err) => {

        if (err) {
            console.error('Error updating transaction', err)
            return res.status(500).json({error: "Error updating transaction"})
        }
        calculateSubtotal(db)
        res.json({ message: `Transactions ${id} successfully updated` })

    })

}

module.exports = {updateTransaction}