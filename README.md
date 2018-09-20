# Getting started

* run `npm run-script setup`
    * you can provide arguments for username, password, database port, app port, database name, test database name, base url *in that order* when running this script; if any of them is not provided, default values will be used


# Considerations
* All keys for output strictly adheres to instructions
* Naming: snake case chosen despite JS convention preferring camel case due to instructions using snake case
* `swagger.yml` - swagger chosen to pre-document code, top down approach for consolidating requirements into end points, easy to read and navigate especially for cross-functional teams; did not use swagger code generator for server -- too much bloat in generated code 
* Database
    * Using VARCHAR(251) to store `original_url` and `int64` for id - scalebility purposes: need to be able to handle long website addresses, also anticipating a lot of entries
