const {initDatabase} = require("./dbCreator");

function calculateSubtotal() {

    const db = initDatabase()

    const totalGetQuery = 'SELECT total from balance WHERE id = 1'
    const transactionsGetQuery = 'SELECT * from transactions'
    const updateSubtotalQuery = 'UPDATE current_balance SET subtotal = ? WHERE id = 1'


    db.get(totalGetQuery, (err, total) => {
        if (err) {db.close(); console.error(err)}

        db.all(transactionsGetQuery, (err, transactions) => {
            if (err) {db.close(); console.error(err)}

            let subtotal = total.total
            transactions.forEach(transaction => {

                if (transaction.type === 'received') {
                    subtotal += transaction.value
                } else {
                    subtotal -= transaction.value
                }

            })

            db.run(updateSubtotalQuery, [subtotal], (err) => {
                if (err) {db.close(); console.error(err)}
            })

        })

    })

}

module.exports = {calculateSubtotal}