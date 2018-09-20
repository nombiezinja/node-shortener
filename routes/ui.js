// should be dried up 
const express = require('express');
const router = express.Router();

module.exports = () => {

  router.post('/shorten', async (req, res) => {
    console.log("here")
    try {
      const response = await fetch(process.env.BASE_URL + '/api/shorten', {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const json = await response.json();
      switch (response.status) {
        case 200:
          return res.render('shortened', {
            item: {
              id: json.id,
              shortened_url: json.shortened_url,
              original_url: json.original_url
            }
          });
        case 422:
          return res.render('shortened', {
            error: "Invalid input, please try again"
          });
        default:
          return res.render('shortened', {
            error: "Unknown error, please try again"
          });
      }

    } catch (error) {
      return res.render('shortened', {
        error: error
      })
    }

  })
}