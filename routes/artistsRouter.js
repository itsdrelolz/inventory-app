const express = require('express');
const artistsRouter = express.Router();
const artistsController = require('../controllers/artistsController');

// GET all artists
artistsRouter.get('/', artistsController.getAllArtists);

// GET form to create a new artist
artistsRouter.get('/create', artistsController.createArtistsGet);

// POST to create a new artist
artistsRouter.post('/create', artistsController.createArtistsPost);

// GET form to edit an artist
artistsRouter.get('/edit/:id', artistsController.getEditArtistForm);

// POST to update an artist
artistsRouter.post('/edit/:id', artistsController.updateArtistPost);

// POST to delete an artist
artistsRouter.post('/delete/:id', artistsController.deleteSingleArtistPost);

// GET a single artist by ID
artistsRouter.get('/:id', artistsController.getSingleArtistGet);

module.exports = artistsRouter;