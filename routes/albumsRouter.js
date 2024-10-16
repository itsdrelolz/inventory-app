const express = require("express");
const albumsRouter = express.Router();
const albumsController = require("../controllers/albumsController");

// GET all albums
albumsRouter.get("/", albumsController.getAllAlbums);

// GET form to create a new album
albumsRouter.get("/create", albumsController.createAlbumGet);

// POST to create a new album
albumsRouter.post("/create", albumsController.createAlbumPost);

// GET a single album by ID
albumsRouter.get("/:id", albumsController.getSingleAlbumGet);

// GET form to edit an album
albumsRouter.get("/edit/:id", albumsController.getEditAlbumForm);

// POST to update an album
albumsRouter.post("/edit/:id", albumsController.editAlbumPost);

// POST to delete an album
albumsRouter.post("/delete/:id", albumsController.deleteSingleAlbumPost);

module.exports = albumsRouter;