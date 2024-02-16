const sqlite3 = require('sqlite3').verbose()
const fs = require('fs')

function buildDatabase(db) {

    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, value REAL)')
        db.run('CREATE TABLE IF NOT EXISTS current_balance (id INTEGER PRIMARY KEY, subtotal REAL)')
        db.run('CREATE TABLE IF NOT EXISTS balance (id INTEGER PRIMARY KEY, total REAL)')
        db.run('INSERT INTO current_balance (subtotal) VALUES (0)')
        db.run('INSERT INTO balance (total) VALUES (0)')
    })

}

function initDatabase() {

    const dbAlreadyCreated = fs.existsSync('./database_sqlite')
    const db = new sqlite3.Database('./database_sqlite')

    if (dbAlreadyCreated) {
        return db
    }

    try {
        buildDatabase(db)
        console.log("Database successfully built! ")
        return db
    }
    catch (error) {console.error("Error building database")}

}

module.exports = {initDatabase}