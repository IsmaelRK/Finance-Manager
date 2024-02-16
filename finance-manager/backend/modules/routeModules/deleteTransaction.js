const {calculateSubtotal} = require("../calculateSubtotal");
const {initDatabase} = require("../dbCreator");

function deleteTransaction(req, res) {

    const db = initDatabase()

    const id = req.params.id
    const deleteTransactionQuery = 'DELETE FROM transactions WHERE id = ?'

    db.run(deleteTransactionQuery, id, function(err) {
        if (err) {db.close(); return res.status(500).json({ error: "Delete Transaction Failed" })}

        calculateSubtotal()
        res.json({ message: `Transaction ${id} deleted successfully` })
        db.close()
    })

}

module.exports = {deleteTransaction}