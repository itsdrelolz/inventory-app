const db = require('../db/queries')


async function getAllArtists(req, res) { 
    const artists = await db.getAllArtists();
    res.render("artist", {
        title: "Artists",
        artists: artists
    })
}



module.exports = { 
    getAllArtists, 

}