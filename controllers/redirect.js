const Url_items = require('../models/Url_items')

// router.get('/:unique_code', [
//   check('unique_code')
//   .isString()
//   .isAlphanumeric()
//   .isLength(5)
// ], async (req, res) => {

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(422).json({
//       errors: errors.array()
//     });

//   };

//   //Fetching row from db here instead of in validator to avoid two calls for valid unique_codes
//   const item = await Url_items.find_by_code(req.params.unique_code)
//   if (item[0]) {
//     res.redirect(item[0].original_url)
//   } else {
//     res.status(422).json({
//       // errors in array format to have consistent returns 
//       // with express-validator-package generated output
//       errors: ['Invalid unique code, item not found']
//     })
//   }
// });
module.exports = {
  get: async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(422).json({
    //     errors: errors.array()
    //   });
    // };

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
  }
}