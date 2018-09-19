const express = require('express');
const router = express.Router();


module.exports = (params_middleware, Url_items) => {
  
  // router.post('/shorten',params_middleware, (req, res) => {
  //   res.send("it a shorten")
  // });

  // router.get('/:code',params_middleware, (req, res) => {
  //   res.send("it a code")
  // });

  // router.get('/urls/:code',params_middleware, (req, res) => {
  //   res.send("it a code")
  // });
  

  router.get('/', params_middleware, (req, res) => {
    console.log("hello")
    res.send("it a api")
  });
  
  return router;
};