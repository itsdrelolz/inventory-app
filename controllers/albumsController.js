
const db = require('../db/queries')
const { formatDate } = require('../utils/formatters');

async function getAllAlbums(req, res, next) { 
    try{
    const albums = await db.getAllAlbums();
    
    const formattedAlbums = albums.map(( { artist_name , album_id, album_name, release_date, picture_url }) => { 
    const formattedDate = formatDate(release_date)
    return {
                album_id,
                name: album_name,
                release_date: formattedDate,
                picture_url, 
                artist_name
            };
    });
    console.log(formattedAlbums)
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
        albumName: albumName, 
        release_date: releaseDate, 
        picture_url: pictureUrl 
      } = req.body;
       await db.insertAlbum(title, albumName, releaseDate, pictureUrl); 
      res.redirect("/albums") }
       catch (err) {
        console.error('Error creating album:', err);
        res.status(500).render('error', { 
            message: 'Failed to create album', 
            error: err 
        });
    }
}

async function getSingleAlbumGet(req, res) { 
    const id = req.params.id;
    console.log(id);
    try {
        const albumData = await db.searchAlbum(id);
        if (!albumData) {
            return res.status(404).render('error', {
                message: 'Album not found',
                error: { status: 404 }
            });
        }
        
        const album = {
            ...albumData[0],
            releaseDate: formatDate(albumData[0].release_date),
        };
        console.log(album);
        
        res.render("singleAlbum", {
            title: `${album.album_name} - Album Details`,
            albums: album 
        });
    } catch (err) {
        console.error('Error fetching album details:', err);
        res.status(500).render('error', {
            message: 'Failed to fetch album details',
            error: err
        });
    }
}

async function deleteSingleAlbumPost(req, res) { 
    
}
module.exports = { 
    getAllAlbums,
    createAlbumGet,
    createAlbumPost,
    createAlbumGet,
    getSingleAlbumGet,
    deleteSingleAlbumPost
}

