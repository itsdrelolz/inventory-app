
const express = require("express") 
const { formatDate, formatActiveStatus } = require('../utils/formatters');

const albumsRouter = express.Router();
const albumsController = require("../controllers/albumsController")

albumsRouter.get("/", albumsController.getAllAlbums)

albumsRouter.get("/create", albumsController.createAlbumGet)

albumsRouter.post("/create", albumsController.createAlbumPost)

albumsRouter.get("/:id", albumsController.getSingleAlbumGet)

module.exports =  albumsRouter; 