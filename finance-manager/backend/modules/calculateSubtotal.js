const {initDatabase} = require("./dbCreator");

function calculateSubtotal() {

    const db = initDatabase()


    const totalGetQuery = 'SELECT total from balance WHERE id = 1'
    const transactionsGetQuery = 'SELECT * from transactions'
    const updateSubtotalQuery = 'UPDATE current_balance SET subtotal = ? WHERE id = 1'

    try {
        db.get(totalGetQuery, (err, total) => {
            if (err) {throw err}

            db.all(transactionsGetQuery, (err, transactions) => {
                if (err) {throw err}

                let subtotal = total.total
                transactions.forEach(transaction => {

                    if (transaction.type === 'received') {
                        subtotal += transaction.value
                    } else {
                        subtotal -= transaction.value
                    }

                })

                db.run(updateSubtotalQuery, [subtotal], (err) => {
                    if (err) {throw err}
                })

            })

        })
    } catch (error) {
        console.error("Error getting total")
    } finally {
        db.close()
    }


}

module.exports = {calculateSubtotal}