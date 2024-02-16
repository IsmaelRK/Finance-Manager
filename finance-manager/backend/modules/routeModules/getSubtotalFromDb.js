const {initDatabase} = require("../dbCreator");

function getSubtotalFromDb(req, res) {

    const db = initDatabase()
    const getSubtotalQuery = 'SELECT subtotal from current_balance WHERE id = 1'

    db.get(getSubtotalQuery, (err, subtotal) => {

        if (err){db.close(); return res.status(500).json({ error: "Get subtotal failed" })}

        res.json(subtotal)
        db.close()
    })

}

module.exports = {getSubtotalFromDb}