const express = require('express');

const app = express();
const port = 3001; 

app.get('/', (req, res) => {
  res.send('Bem-vindo ao seu servidor Node.js!');
});

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
