const express = require('express');
const router = express.Router();
const shorten = require('../lib/shorten');

module.exports = (Url_items) => {
  
  router.post('/shorten', (req, res) => {
    console.log(shorten.random_string())
    res.send("it a shorten")
  });

  router.get('/:code', (req, res) => {
    res.send("it a code")
  });

  router.get('/urls/:code', (req, res) => {
    res.send("it a full code")
  });
  

  router.get('/', (req, res) => {
    console.log("hello")
    res.send("it a api")
  });
  
  return router;
};