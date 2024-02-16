const {initDatabase} = require("../dbCreator");

function getSubtotalFromDb(req, res) {

    const getSubtotalQuery = 'SELECT subtotal from current_balance WHERE id = 1'
    const db = initDatabase()

    try {

        db.get(getSubtotalQuery, (err, subtotal) => {

            if (err){throw err}
            res.json(subtotal)
        })

    } catch (error) {
        res.status(500).json({ error: 'Error updating total value in balance table' })
    } finally {
        db.close()
    }

}

module.exports = {getSubtotalFromDb}