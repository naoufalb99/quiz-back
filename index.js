const express = require('express')
const routes = require('./src/routes')
const app = express()

app.use(express.json())
app.use(routes)

app.use((req, res, next) => {
  res.status(404).send({ message: 'Not found', code: 404 })
})

app.use((_, req, res, next) => {
  res.status(500).send({ error: 'Something failed!' })
})

app.listen(3001, () => {
  console.log('Application started successfully on http://localhost:3001')
})
