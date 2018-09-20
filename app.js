require('dotenv').config({
  silent: true
})

const port = process.env.PORT
const express = require('express')
const app = express()
const ENV = app.get('env')
const bodyParser = require('body-parser')

const http = require('http')
const server = http.createServer(app)

const knexConfig = require('./knexfile')
const knex = require('knex')(knexConfig[ENV])
const knexLogger = require('knex-logger')

const morgan = require('morgan')

// db queries
const Url_items = require('./models/Url_items')(knex)
const api_routes = require('./routes/api')

app.use(morgan('dev'))
app.use(knexLogger(knex))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', './public')
app.use(express.static('public'))

app.use(express.json())

app.get('/', (req, res) => {
  res.render('index')
})

app.use('/api', api_routes(Url_items))

app.use((req, res, next) => {
  return res.status(404).send({ error: 'Route' + req.url + ' Not found.' })
})

server.listen(port, function listening () {
  console.log('Listening on %d', server.address().port)
})

