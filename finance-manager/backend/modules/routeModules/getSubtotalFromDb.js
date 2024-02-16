function getSubtotalFromDb(db, req, res) {

    const getSubtotalQuery = 'SELECT subtotal from current_balance WHERE id = 1'
    db.get(getSubtotalQuery, (err, subtotal) => {

        if (err){
            console.error("Error ", err)
            res.status(500).json({ error: 'Error updating total value in balance table' })
        } else {
            res.json(subtotal)
        }

    })

}

module.exports = {getSubtotalFromDb}