const express = require('express');
const router = express.Router();
const shorten = require('../lib/shorten');
const Url_items = require('../models/Url_items')
const {  sanitizeBody} = require('express-validator/filter');
const {  check, validationResult } = require('express-validator/check');

module.exports = (Url_items) => {

  router.post('/shorten', [
    check('url_to_shorten')
    .not().isEmpty()
    .isURL()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({
        errors: errors.array()
      });
    };
  
    const duplicate = await Url_items.check_duplicate(req.body.url_to_shorten);

    if (!duplicate[0]) {
      const unique_code = shorten.random_string()
      const saved = await Url_items.save(unique_code, req.body.url_to_shorten)

      res.json({
        id: saved[0],
        shortened_url: unique_code,
        original_url: req.body.url_to_shorten
      })
    } else {
      res.json({
        id: duplicate[0].id, 
        shortened_url: duplicate[0].unique_code, 
        original_url: req.body.url_to_shorten
      })
    }
  });

  router.get('/:unique_code', (req, res) => {
    //sanitize code
    //check if code valid

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