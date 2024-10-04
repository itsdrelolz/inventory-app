
const express = require("express") 
const Router = express.Router();


const artistController = require('../controllers/artistsController')
const artistsRouter = Router();



artistsRouter.get("/artists", artistController.getAllArtists)
// artistsRouter.get("/artists/create", )
// artistsRouter.get("/artists/:artistId", )


module.exports = artistsRouter;