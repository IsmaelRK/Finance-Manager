const {calculateSubtotal} = require("../calculateSubtotal");

function updateTotalOnDb(db, req, res) {
    const { total } = req.params
    
    
    const totalUpdateQuery = 'UPDATE balance set total = ? WHERE id = 1'
    db.run(totalUpdateQuery, [total], function (error) {

        if (error) {
            console.error('Error updating total value in balance table:', error.message)
            res.status(500).json({ error: 'Error updating total value in balance table' })
        }
        else {
            calculateSubtotal(db)
            res.json({ message: 'Total value updated successfully in balance table' })
            console.log('Total value updated successfully in balance table.')

        }

    })
}

module.exports = {updateTotalOnDb}