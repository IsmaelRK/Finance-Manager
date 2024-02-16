const {calculateSubtotal} = require("../calculateSubtotal");

function deleteTransaction(db, req, res) {

    const id = req.params.id
    db.run("DELETE FROM transactions WHERE id = ?", id, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        calculateSubtotal(db)
        res.json({ message: `Transaction ${id} deleted successfully` })
    })

}

module.exports = {deleteTransaction}