const express = require('express');
const router = express.Router();
const util = require('../lib/util');
const {  check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
// This file is too long, can break into 3 controller files and use this to route only
module.exports = (Url_items) => {

  router.post('/shorten', [
    // syntax of express-validator
    check('url_to_shorten')
    .not().isEmpty()
    .isURL(), 
    sanitizeBody('url_to_shorten')
    .customSanitizer((value) => {
     //normalize format of url before saving to db
      const regex = /^(ftp|http|https):\/\//
     if (regex.test(value) !== true) {
       value = 'http://' + value;
     }
     return value
    })
  ], async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    };
  
    const duplicate = await Url_items.check_duplicate(req.body.url_to_shorten);

    // If duplicate entry already exists, send that entry instead of creating new entry
    if (!duplicate[0]) {
      const unique_code = util.random_string()
      const saved = await Url_items.save(unique_code, req.body.url_to_shorten)
      res.json({
        id: saved[0],
        shortened_url: process.env.BASE_URL + "/api/" + unique_code,
        original_url: req.body.url_to_shorten
      })
    } else {
      res.json({
        id: duplicate[0].id, 
        shortened_url:process.env.BASE_URL + "/api/" + duplicate[0].unique_code, 
        original_url: req.body.url_to_shorten
      })
    }
  });

  router.get('/:unique_code', [
    check('unique_code')
    .isString()
    .isAlphanumeric()
    .isLength(5)
  ], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    };
   
    //Fetching row from db here instead of in validator to avoid two calls for valid unique_codes
    const item = await Url_items.find_by_code(req.params.unique_code)
    if (item[0]) {
      res.status(301).redirect(item[0].original_url)
    } else {
      res.status(422).json({
        // errors in array format to have consistent returns 
        // with express-validator-package generated output
        errors: ['Invalid unique code, item not found']
      })
    }
  });

  router.get('/urls/:unique_code', [check('unique_code')
    .isString()
    .isAlphanumeric()
    .isLength(5)
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    };
   
    const item = await Url_items.find_by_code(req.params.unique_code)
    if (item[0]) {
      res.status(200).send({
        id: item[0].id, 
        shortened_url: process.env.BASE_URL + "/api/" + item[0].unique_code, 
        original_url: item[0].original_url
      })
    } else {
      res.status(422).json({
        // errors in array format to have consistent returns 
        // with express-validator-package generated output
        errors: ['Invalid unique code, item not found']
      });
    };
  });
  
  return router;
};