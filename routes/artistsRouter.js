
const express = require("express") 

const artistsRouter = express.Router();


const artistController = require('../controllers/artistsController')




artistsRouter.get("/", artistController.getAllArtists)
artistsRouter.get("/create", artistController.createArtistsGet)
// artistsRouter.get("/artists/:artistId", )
artistsRouter.post("/create", artistController.createArtistsPost)

module.exports =  artistsRouter; 