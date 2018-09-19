require('dotenv').config({
  silent: true
});

// const ENV = process.env.NODE_ENV;
const port = process.env.PORT ;
const express = require('express');
const app = express();
const ENV = app.get('env');
const bodyParser = require('body-parser');
const http = require('http');
const server = http.createServer(app);

const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);
const knexLogger = require('knex-logger');


const morgan = require('morgan');

const Url_items = require('./models/Url_items')(knex);
const api_routes = require('./routes/api');
// const params_middleware = require('./middlewares/params');

app.use(morgan('dev'));
app.use(knexLogger(knex));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.send("its alive")
});

app.use('/api', api_routes(Url_items));

server.listen(port, function listening() {
  console.log('Listening on %d', server.address().port);
});

module.exports = server;