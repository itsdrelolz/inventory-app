const db = require('../db/queries')

async function getAllAlbums(req, res) { 
    const albums = await db.getAllAlbums();
    res.render("album", {
        title: albums,
        albums: albums
    })
}




module.exports = { 
    getAllAlbums
    
}