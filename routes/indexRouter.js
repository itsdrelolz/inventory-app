const express = require("express") 
const Router = express.Router();
const { getInventory } = require("../controllers/indexController");



const indexRouter = Router();


indexRouter.get('/', getInventory);

module.exports = indexRouter;