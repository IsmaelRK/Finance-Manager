const sqlite3 = require('sqlite3').verbose()

function initDatabase() {

    const db = new sqlite3.Database('./database_sqlite')

    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, value REAL)')

        db.run('CREATE TABLE IF NOT EXISTS current_balance (id INTEGER PRIMARY KEY, subtotal REAL)')
        db.get('SELECT * from current_balance', function (error, row) {
            if (error) {
                console.error("Error", error.message)
            }
            else {
                if (!row) {
                    db.run('INSERT INTO current_balance (subtotal) VALUES (0)', function (error) {
                        if (error) {
                            console.error("Error", error.message)
                        }
                        else {
                            console.log("Success")
                        }
                    })
                }
            }
        })

        db.run('CREATE TABLE IF NOT EXISTS balance (id INTEGER PRIMARY KEY, total REAL)')
        db.get('SELECT * from balance', function (error, row) {

            if (error) {
                console.error("Error", error.message)
            }
            else {
                if (!row) {
                    db.run('INSERT INTO balance (total) VALUES (0)', function (error) {
                        if (error) {
                            console.error("Error", error.message)
                        }
                        else {
                            console.log("Success")
                        }
                    })
                }
            }
        })
    })

    return db
}

module.exports = {initDatabase}