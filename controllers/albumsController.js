const db = require('../db/queries')



async function getAllAlbums(req, res) { 
    const albums = await db.getAllArtists();

    const formattedAlbums = albums.map(( { name, country, birthdate, active_status, picture_url }) => { 
        return {name, country, birthdate, active_status, picture_url}
    });
    res.render("album", {
        title: "Albums",
        albums: formattedAlbums
    })
}


module.exports = { 
    getAllAlbums
}



