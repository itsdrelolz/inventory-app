const { Pool } = require("pg")
const dotenv = require('dotenv')
dotenv.config();
console.log(process.env) 



module.exports = new Pool({
    host: "localhost", 
    user: "<role_name>",
    database: "top_users",
    password: "<role_password>",
    port: 5432 
  });