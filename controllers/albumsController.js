
const db = require('../db/queries')



async function getAllAlbums(req, res, next) { 
    try{
    const albums = await db.getAllAlbums();

    const formattedAlbums = albums.map(( { name, release_date, picture_url }) => { 
        return {name, release_date, picture_url}
    });
    res.render("albums", {
        title: "Albums",
        albums: formattedAlbums
    })
} catch(err) { 
    console.error("Error fetching inventory data:", err);
    next(err)
}
}
function getAlbumForm(req, res) { 
    res.render("albumsForm", {
        title: "Albums Form"
    })
}


module.exports = { 
    getAllAlbums,
    getAlbumForm
}

