const {initDatabase} = require("../dbCreator");

function getTotalFromDb (req, res) {
    const db = initDatabase()


    const getTotalQuery = 'SELECT total FROM balance WHERE id = 1'
    db.get(getTotalQuery, function (err, total) {

        if (err) {db.close(); return res.status(500).json({ error: "Get total failed" })}

        res.json(total)
        db.close()

    })

}

module.exports = {getTotalFromDb}