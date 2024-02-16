const {calculateSubtotal} = require("../calculateSubtotal");
const {initDatabase} = require("../dbCreator");

function updateTotalOnDb(req, res) {

    const { total } = req.params
    const totalUpdateQuery = 'UPDATE balance set total = ? WHERE id = 1'

    const db = initDatabase()

    db.run(totalUpdateQuery, [total], function (err) {

        if (err) {db.close(); return res.status(500).json({ error: "Total update failed" })}
        else {
            calculateSubtotal()
            res.json({ message: 'Total value updated successfully in balance table' })
            console.log('Total value updated successfully in balance table.')

        }

        db.close()
    })

}

module.exports = {updateTotalOnDb}