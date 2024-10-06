
const express = require("express") 

const artistsRouter = express.Router();


const artistController = require('../controllers/artistsController')




artistsRouter.get("/", artistController.getAllArtists)
artistsRouter.get("/create", artistController.createArtistsGet)
artistsRouter.post("/create", artistController.createArtistsPost)
artistsRouter.get("/:id", artistController.getSingleArtistGet)
module.exports =  artistsRouter;








