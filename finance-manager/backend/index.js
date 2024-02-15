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
  db.run('CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, amount REAL)');
  db.run('CREATE TABLE IF NOT EXISTS balance (id INTEGER PRIMARY KEY, total REAL)');
})

app.post('/update-total', (req, res) => {

  const { total } = req.body



  res.json({message: "Received"})

})


app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
