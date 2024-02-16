function calculateSubtotal(db) {

    const totalGetQuery = 'SELECT total from balance WHERE id = 1'
    const transactionsGetQuery = 'SELECT * from transactions'
    const updateSubtotalQuery = 'UPDATE current_balance SET subtotal = ? WHERE id = 1'

    db.get(totalGetQuery, (err, total) => {
        if (!err) {

            db.all(transactionsGetQuery, (err, transactions) => {

                let subtotal = total.total
                transactions.forEach(transaction => {

                    if (transaction.type === 'received') {
                        subtotal += transaction.value
                    } else {
                        subtotal -= transaction.value
                    }

                })

                db.run(updateSubtotalQuery, [subtotal], (err) => {

                    if (err) {
                        console.error("Error updating subtotal")
                    }

                })

            })

        } else {
            console.error("Error getting total")
        }
    })
}

module.exports = {calculateSubtotal}