
const db = require('../db/queries')



async function getAllAlbums(req, res, next) { 
    try{
    const albums = await db.getAllAlbums();

    const formattedAlbums = albums.map(( { id, name, release_date, picture_url }) => { 
        return {id, name, release_date, picture_url}
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

function createAlbumGet(req, res) { 
    res.render("albumsForm", {
        title: "Albums Form"
    })
}



async function createAlbumPost(req, res) { 
    try { 
    const { 
        title, 
        artistName: artistName, 
        release_date: releaseDate, 
        picture_url: pictureUrl 
      } = req.body;
      const result = await db.insertAlbum(title, artistName, releaseDate, pictureUrl); 
      res.redirect("/albums") }
       catch (err) {
        console.error('Error creating album:', err);
        res.status(500).render('error', { 
            message: 'Failed to create album', 
            error: err 
        });
    }
}


module.exports = { 
    getAllAlbums,
    createAlbumGet,
    createAlbumPost
}

