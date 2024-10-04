const db = require('../db/queries')


async function getAllArtists(req, res) { 
    const artists = await db.getAllArtists();

    const formattedArtists = artists.map(( {id, name, country, birthdate, active_status, picture_url }) => { 
        return {name, country, birthdate, active_status, picture_url}
    });
    res.render("artist", {
        title: "Artists",
        artists: formattedArtists
    })
}


module.exports = { 
    getAllArtists
}
