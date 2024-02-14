const express = require('express');
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()

const app = express();
const port = 3001;

app.use(cors())
app.use(express.json())

const db = new sqlite3.Database(':memory')
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, amount REAL)')
})

app.get('/transactions', (req, res) => {
  console.log("get /transactions")

  db.all('SELECT * FROM transactions', (err, rows) => {

    if (err) {
      res.status(500).send("Get Trasactions Database Error")
    }
    else {
      res.json(rows)
    }

  })

})

app.post('/transactions', (req, res) => {
  console.log("post /transactions")

  const {type, amount} = req.body

  db.run('INSERT INTO transactions (type, amount) VALUES (?, ?)', [type, amount], function (err) {

    if (err) {
      res.status(500).send("POST Trasactions Database Error")
    }
    else {
      res.json({id: this.lastID})
    }

  })

})


app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
