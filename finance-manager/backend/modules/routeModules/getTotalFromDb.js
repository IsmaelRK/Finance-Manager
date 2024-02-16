function getTotalFromDb (db, req, res) {

    const getTotalQuery = 'SELECT total FROM balance WHERE id = 1'
    db.get(getTotalQuery, function (err, total) {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.json(total)
    })

}

module.exports = {getTotalFromDb}