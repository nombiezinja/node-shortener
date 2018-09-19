require('dotenv').config({
  silent: true
});

// const ENV = process.env.NODE_ENV;
const port = process.env.PORT || 8080;
const express = require('express');
const app = express();
const ENV = app.get('env')
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);
const morgan = require('morgan');
const http = require('http');
const knexLogger = require('knex-logger');

const server = http.createServer(app);


const fs = require('fs');
const path = require('path');

app.use(morgan('dev'));

app.use(knexLogger(knex));


app.get('/test1', (req, res) => {
  console.log("I'm aliveeeee")
});


server.listen(port, function listening() {
  console.log('Listening on %d', server.address().port);
});

module.exports = server;