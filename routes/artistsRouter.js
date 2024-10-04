
const express = require("express") 

const artistsRouter = express.Router();


const artistController = require('../controllers/artistsController')




artistsRouter.get("/", artistController.getAllArtists)
// artistsRouter.get("/artists/create", )
// artistsRouter.get("/artists/:artistId", )


module.exports =  artistsRouter; 