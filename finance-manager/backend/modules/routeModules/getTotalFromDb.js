const {initDatabase} = require("../dbCreator");

function getTotalFromDb (req, res) {

    const db = initDatabase()

    try {

        const getTotalQuery = 'SELECT total FROM balance WHERE id = 1'
        db.get(getTotalQuery, function (err, total) {

            if (err) {throw err}
            res.json(total)
        })

    } catch (error) {
        return res.status(500).json({ error: error.message })

    } finally {
        db.close()
    }

}

module.exports = {getTotalFromDb}