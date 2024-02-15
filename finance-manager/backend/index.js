const express = require('express')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()
const bodyParser = require('body-parser')
const app = express()
const port = 3001

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

const db = new sqlite3.Database(':memory')
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

function calculateSubtotal() {

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


app.post('/update-total', (req, res) => {

  const newTotal = req.body.total
  const totalUpdateQuery = 'UPDATE balance set total = ? WHERE id = 1'
  db.run(totalUpdateQuery, [newTotal], function (error) {

    if (error) {
      console.error('Error updating total value in balance table:', error.message)
      res.status(500).json({ error: 'Error updating total value in balance table' })
    }
    else {
      calculateSubtotal()
      res.json({ message: 'Total value updated successfully in balance table' })
      console.log('Total value updated successfully in balance table.')

    }

  })
})

app.get('/get-total', (req, res) => {

  const getTotalQuery = 'SELECT total FROM balance WHERE id = 1'
  db.get(getTotalQuery, function (err, total) {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json(total)
  })

})

app.post('/transactions', (req, res) => {
  const { type, value } = req.body
  db.run("INSERT INTO transactions (type, value) VALUES (?, ?)", [type, value], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message })
    }

    calculateSubtotal()
    res.json({
      id: this.lastID,
      type,
      value
    })
  })
})

app.get('/transactions', (req, res) => {
  db.all("SELECT * FROM transactions", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json(rows)
  })
})

app.delete('/transactions/:id', (req, res) => {
  const id = req.params.id
  db.run("DELETE FROM transactions WHERE id = ?", id, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    calculateSubtotal()
    res.json({ message: `Transaction ${id} deleted successfully` })
  })
})


app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`)
})
