const express = require('express')
const cors = require('cors')
const routes = require('./src/routes')
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', routes)

app.use((req, res, next) => {
  res.status(404).send({ message: 'Not found', code: 404 })
})

app.use((_, req, res, next) => {
  res.status(500).send({ error: 'Something failed!' })
})

app.listen(3001, () => {
  console.log('Application started successfully on http://localhost:3001')
})
