const express = require('express');
const router = express.Router();
const shorten = require('../lib/shorten');
const Url_items = require('../models/Url_items')
module.exports = (Url_items) => {
  
  router.post('/shorten', (req, res) => {
    // validate url 
    // generate code 
    // create db row 
    // return json object
    console.log(req.body)
    const valid_url = (shorten.validate_url(req.params.url_to_shorten)) 
    res.send(valid_url)
  });

  router.get('/:unique_code', (req, res) => {
    res.send("it a unique_code")
  });

  router.get('/urls/:unique_code', (req, res) => {
    res.send("it a full unique_code")
  });
  

  router.get('/', (req, res) => {
    console.log("hello")
    res.send("it a api")
  });
  
  return router;
};