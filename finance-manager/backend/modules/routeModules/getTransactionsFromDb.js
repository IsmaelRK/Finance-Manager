function getTransactionsFromDb (db, req, res) {

    db.all("SELECT * FROM transactions", (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.json(rows)
    })

}

module.exports = {getTransactionsFromDb}