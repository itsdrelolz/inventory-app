
const express = require("express") 

const indexRouter = express.Router();
const { getInventory } = require("../controllers/indexController");



indexRouter.get('/', getInventory);
module.exports =  indexRouter; 

