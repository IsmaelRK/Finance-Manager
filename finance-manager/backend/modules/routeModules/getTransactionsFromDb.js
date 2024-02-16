const {initDatabase} = require("../dbCreator");

function getTransactionsFromDb (req, res) {

    const db = initDatabase()
    const selectTransactionsQuery = 'SELECT * FROM transactions'

    db.all(selectTransactionsQuery, (err, rows) => {
        if (err) {db.close(); return res.status(500).json({ error: "Select transactions failed" })}
        res.json(rows)

        db.close()
    })

}

module.exports = {getTransactionsFromDb}