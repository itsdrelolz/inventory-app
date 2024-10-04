const { Pool } = require("pg")
const dotenv = require('dotenv')
dotenv.config();
console.log(process.env) 



const pool = new Pool({
    host: "localhost", 
    user: "dre",
    database: "album_db",
    password: "Pwer2003!",
    port: 5432 
  });

  module.exports = pool;