const db = require('../db/queries');
const { formatDate } = require('../utils/formatters');

async function getAllAlbums(req, res, next) {
    try {
        const albums = await db.getAllAlbums();
        const formattedAlbums = albums.map(({ artist_name, album_id, album_name, release_date, picture_url }) => {
            const formattedDate = formatDate(release_date);
            return {
                album_id,
                name: album_name,
                release_date: formattedDate,
                picture_url,
                artist_name
            };
        });
        console.log(formattedAlbums);
        res.render("albums", {
            title: "Albums",
            albums: formattedAlbums
        });
    } catch (err) {
        console.error("Error fetching album data:", err);
        next(err);
    }
}

function createAlbumGet(req, res) {
    res.render("albumsForm", {
        title: "Albums Form"
    });
}

async function createAlbumPost(req, res) {
    try {
        const {
            title,
            artistName,
            releaseDate,
            picture_url
        } = req.body;
        await db.insertAlbum(title, artistName, releaseDate, picture_url);
        res.redirect("/albums");
    } catch (err) {
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
        if (!albumData || albumData.length === 0) {
            return res.status(404).render('error', {
                message: 'Album not found',
                error: { status: 404 }
            });
        }

        const album = {
            ...albumData[0],
            release_date: albumData[0].release_date ? new Date(albumData[0].release_date) : null
        };

        res.render("singleAlbum", {
            title: `${album.album_name} - Album Details`,
            albums: [album]  
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
    const id = req.params.id;
    try {
        await db.deleteAlbum(id);
        res.redirect("/albums");
    } catch (err) {
        console.error('Error deleting album:', err);
        res.status(500).render('error', {
            message: 'Failed to delete album',
            error: err
        });
    }
}

async function getEditAlbumForm(req, res) {
    const albumId = req.params.id;
    try {
        const albumData = await db.searchAlbum(albumId);
        if (!albumData || albumData.length === 0) {
            return res.status(404).render('error', {
                message: 'Album not found',
                error: { status: 404 }
            });
        }
        
        const album = albumData[0]; // Get the first (and should be only) album from the result
        
        // Format the album data
        const formattedAlbum = {
            ...album,
            release_date: album.release_date ? new Date(album.release_date).toISOString().split('T')[0] : ''
        };

        res.render("editAlbum", {
            title: `Edit ${album.album_name}`,
            album: formattedAlbum
        });
    } catch (err) {
        console.error('Error fetching album for editing:', err);
        res.status(500).render('error', {
            message: 'Failed to fetch album for editing',
            error: err
        });
    }
}

async function editAlbumPost(req, res) {
    const albumId = req.params.id;
    try {
        const { title, artistName, releaseDate, pictureUrl } = req.body;
        
        if (!title || title.trim() === '') {
            throw new Error("Album title is required");
        }

        await db.updateAlbum(albumId, title.trim(), artistName, releaseDate || null, pictureUrl || null);
        res.redirect(`/albums/${albumId}`);
    } catch (err) {
        console.error('Error updating album:', err);
        res.status(500).render('error', {
            message: 'Failed to update album',
            error: err.message
        });
    }
}

module.exports = {
    getAllAlbums,
    createAlbumGet,
    createAlbumPost,
    getSingleAlbumGet,
    deleteSingleAlbumPost,
    getEditAlbumForm,
    editAlbumPost
};