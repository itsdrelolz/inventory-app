const db = require('../db/queries')

async function getAllAlbums(req, res) { 
    const albums = await db.getAllAlbums();
    res.render("album", {
        albums: albums
    })
}




module.exports = { 
    getAllAlbums
}