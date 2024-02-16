const {calculateSubtotal} = require("../calculateSubtotal");
const {initDatabase} = require("../dbCreator");

function updateTransaction (req, res) {

    const db = initDatabase()

    const { id } = req.params
    const { type, value } = req.body
    const updateTransactionQuery = 'UPDATE transactions SET type = ?, value = ? WHERE id = ?'

    try {
        db.run(updateTransactionQuery, [type, value, id], (err) => {

            if (err) {throw err}

            calculateSubtotal()
            res.json({ message: `Transactions ${id} successfully updated` })

        })

    } catch (error) {
        return res.status(500).json({error: "Error updating transaction"})
    } finally {
        db.close()
    }

}

module.exports = {updateTransaction}