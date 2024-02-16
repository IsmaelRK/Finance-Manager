const {calculateSubtotal} = require("../calculateSubtotal");
const {initDatabase} = require("../dbCreator");

function deleteTransaction(req, res) {

    const db = initDatabase()

    const id = req.params.id
    const deleteTransactionQuery = 'DELETE FROM transactions WHERE id = ?'

    try {
        db.run(deleteTransactionQuery, id, function(err) {
            if (err) {throw err}

            calculateSubtotal()
            res.json({ message: `Transaction ${id} deleted successfully` })
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    } finally {
        db.close()
    }


}

module.exports = {deleteTransaction}