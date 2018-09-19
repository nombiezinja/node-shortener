const express = require('express');
const router = express.Router();
const shorten = require('../lib/shorten');
const Url_items = require('../models/Url_items')
module.exports = (Url_items) => {
  
  router.post('/shorten', async (req, res) => {
    // validate url 
    // generate code 
    // create db row 
    // return json object
    const valid_url = (shorten.validate_url(req.body.url_to_shorten));
    const duplicate = await Url_items.check_duplicate(req.body.url_to_shorten)
    if (!duplicate[0] && valid_url) {
      const unique_code = shorten.random_string()
      const saved = await Url_items.save(unique_code, req.body.url_to_shorten)
      console.log(saved)
      res.send({
        id: saved[0], 
        shortened_url: unique_code, 
        original_url: req.body.url_to_shorten
      });
    } else {
      res.send("nay")
    }
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