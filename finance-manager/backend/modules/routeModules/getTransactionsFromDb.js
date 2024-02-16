const {initDatabase} = require("../dbCreator");

function getTransactionsFromDb (req, res) {

    const db = initDatabase()
    const selectTransactionsQuery = 'SELECT * FROM transactions'

    try {
        db.all(selectTransactionsQuery, (err, rows) => {
            if (err) {throw err}
            res.json(rows)
        })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    } finally {
        db.close()
    }

}

module.exports = {getTransactionsFromDb}