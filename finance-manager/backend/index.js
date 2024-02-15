const express = require('express');
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());


const db = new sqlite3.Database(':memory')
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, value REAL)');
  db.run('CREATE TABLE IF NOT EXISTS balance (id INTEGER PRIMARY KEY, total REAL);');

  try {
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


  }
  catch (error) {
    console.log("Error")
  }

})

app.post('/update-total', (req, res) => {

  const newTotal = req.body.total
  const totalUpdateQuery = 'UPDATE balance set total = ? WHERE id = 1'
  db.run(totalUpdateQuery, [newTotal], function (error) {

    if (error) {
      console.error('Erro ao atualizar valor total na tabela balance:', error.message);
      res.status(500).json({ error: 'Erro ao atualizar valor total na tabela balance' });
    }
    else {
      res.json({ message: 'Valor total atualizado com sucesso na tabela balance' });
      console.log('Valor total atualizado com sucesso na tabela balance.');

    }

  })
})

app.get('/get-total', (req, res) => {

  const getTotalQuery = 'SELECT total FROM balance WHERE id = 1'
  db.get(getTotalQuery, function (err, total) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(total)
  })

})

app.post('/transactions', (req, res) => {
  const { type, value } = req.body;
  db.run("INSERT INTO transactions (type, value) VALUES (?, ?)", [type, value], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      id: this.lastID,
      type,
      value
    });
  });
});

app.get('/transactions', (req, res) => {
  db.all("SELECT * FROM transactions", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.delete('/transactions/:id', (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM transactions WHERE id = ?", id, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: `Transação ${id} deletada com sucesso` });
  });
});


app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
