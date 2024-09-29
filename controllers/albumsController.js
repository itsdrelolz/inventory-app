const Router = require("express") 

const db = require("../db/queries")
const albumsController = Router();

async function getAllArtists(req, res) { 
    const artists = await db.getAllArtists();
    res.render("artist", {
        artists: artists
    })
}


module.exports = albumsController;