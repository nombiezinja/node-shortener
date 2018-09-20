# Getting started

* run `npm run-script setup`
    * you can provide arguments for username, password, database port, app port, database name, test database name, base url *in that order* when running this script; if any of them is not provided, default values will be used

# Deployment
App is deployed here: 
http://ec2-35-182-228-232.ca-central-1.compute.amazonaws.com/ 
Very basic deployment due to time constraint 

# Considerations
* All keys for output strictly adheres to instructions
* Naming: snake case chosen despite JS convention preferring camel case due to instructions using snake case
* `swagger.yml` - swagger chosen to pre-document code, top down approach for consolidating requirements into end points, easy to read and navigate especially for cross-functional teams; did not use swagger code generator for server -- too much bloat in generated code 
    * Error returns of app different from what is mapped out in swagger.yml due to validation/sanitization package used, did not have time to change this 
* Database
    * Using VARCHAR(251) to store `original_url` and `int64` for id - scalebility purposes: need to be able to handle long website addresses, also anticipating a lot of entries
* url formatting: all incoming url_to_shorten is put through a regex; if protocol is not present, `http` will be attached (http instead of https to reduce likelihood of getting a 404 for websites that do not have SSL certificate)
    * note: some characters such as `_` are not allowed in submitted urls and will result in an error return. 


# Technical debt 
* Tests - due to time constraint no tests have been written; unit tests and integration tests are very important, at least some unit tests should be in place to speed up refactoring before moving down list of reducing technical debt
* Better error handling 
* Should switch to package Joi for validation; current package used (express-validator) cumbersome to customize
* Front end fixes
* Modularize `api.js`  