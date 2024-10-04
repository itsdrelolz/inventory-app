
const express = require("express") 

const albumsRouter = express.Router();
const albumsController = require("../controllers/albumsController")

albumsRouter.get("/", albumsController.getAllAlbums)

albumsRouter.get("/create", albumsController.getAlbumForm)




module.exports =  albumsRouter; 