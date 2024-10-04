
const express = require("express") 

const albumsRouter = express.Router();
const albumsController = require("../controllers/albumsController")

albumsRouter.get("/", albumsController.getAllAlbums)

// albumsRouter.get("/albums/create", )



module.exports =  albumsRouter; 