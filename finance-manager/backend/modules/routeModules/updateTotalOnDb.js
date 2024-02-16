const {calculateSubtotal} = require("../calculateSubtotal");
const {initDatabase} = require("../dbCreator");

function updateTotalOnDb(req, res) {

    const { total } = req.params
    const totalUpdateQuery = 'UPDATE balance set total = ? WHERE id = 1'

    const db = initDatabase()

    try {
        db.run(totalUpdateQuery, [total], function (err) {

            if (err) {throw err}
            else {
                calculateSubtotal()
                res.json({ message: 'Total value updated successfully in balance table' })
                console.log('Total value updated successfully in balance table.')

            }
        })

    } catch (error) {
        res.status(500).json({ error: 'Error updating total value in balance table' })
    } finally {
        db.close()
    }

}

module.exports = {updateTotalOnDb}