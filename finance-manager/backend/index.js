const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3001

const {buildRoutes} = require('./modules/routes')
const {initDatabase} = require("./modules/dbCreator");

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

const db = initDatabase()
db.close()


const routesToBuild = buildRoutes()
routesToBuild.forEach(route => {
  const {requestType, uri, executeFunction} = route

  if (requestType === app.get) {
    app.get(uri, (req, res) => executeFunction(req, res))
  }
  else if (requestType === app.put) {
    app.put(uri, (req, res) => executeFunction(req, res))
  }
  else if (requestType === app.post) {
    app.post(uri, (req, res) => executeFunction(req, res))
  }
  else if (requestType === app.delete) {
    app.delete(uri, (req, res) => executeFunction(req, res))
  }
  })


app.listen(port, () => {
  console.log(`Server is running at -> http://localhost:${port}`)
})
