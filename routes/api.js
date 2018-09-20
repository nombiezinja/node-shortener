const express = require('express');
const router = express.Router();
const util = require('../lib/util');
const Url_items = require('../models/Url_items')
const {  sanitizeBody} = require('express-validator/filter');
const {  check, validationResult } = require('express-validator/check');
var expand_controller = require('../controllers/expand');

module.exports = (Url_items) => {

  router.post('/shorten', [
    check('url_to_shorten')
    .not().isEmpty()
    .isURL()
  ], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    };
  
    const duplicate = await Url_items.check_duplicate(req.body.url_to_shorten);

    if (!duplicate[0]) {
      const unique_code = util.random_string()
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
      res.redirect(item[0].original_url)
    } else {
      res.status(422).json({
        // errors in array format to have consistent returns 
        // with express-validator-package generated output
        errors: ['Invalid unique code, item not found']
      })
    }
  });

  // router.get('/urls/:unique_code', (req, res) => {
  //   res.send("it a full unique_code")
  // });
  router.route('/urls/:unique_code').get(expand_controller.get);

  return router;
};