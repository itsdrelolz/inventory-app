const db = require('../db/queries');
const { formatDate, formatActiveStatus } = require('../utils/formatters');

async function getAllArtists(req, res, next) {
    try {
        const artists = await db.getAllArtists();
        const formattedArtists = artists.map(({artist_id, artist_name, country, birthdate, active_status, picture_url }) => {
            const formattedStatus = formatActiveStatus(active_status)
            const formattedDate = formatDate(birthdate)
            return {
                artist_id,
                name: artist_name,
                country,
                birthdate: formattedDate,
                active_status: formattedStatus,
                picture_url
            };
        });
        res.render("artists", {
            title: "Artists",
            artists: formattedArtists
        });
    } catch (err) {
        console.error("Error fetching artist data:", err);
        next(err);
    }
}

function createArtistsGet(req, res) { 
    res.render("artistsForm", {
        title: "Artist Form"
    })
}

async function createArtistsPost(req, res) { 
    try {
        const { name, country, birthdate, active_status, picture_url } = req.body;
        await db.insertArtist(name, country, birthdate, active_status, picture_url);
        res.redirect('/artists'); 
    } catch (err) {
        console.error('Error creating artist:', err);
        res.status(500).render('error', { 
            message: 'Failed to create artist', 
            error: err 
        });
    }
}

async function getSingleArtistGet(req, res) {
    const id = req.params.id;
    console.log(id);
    try {
        const { artist, albums } = await db.searchArtist(id);
        console.log(artist);

        if (!artist) {
            return res.status(404).render('error', {
                message: 'Artist not found',
                error: { status: 404 }
            });
        }

        const artistData = {
            artist_id: artist.artist_id,
            artist_name: artist.artist_name,
            country: artist.country,
            birthdate: formatDate(artist.birthdate),
            active_status: formatActiveStatus(artist.active_status),
            picture_url: artist.picture_url
        };
            
        const formattedAlbums = albums.map(({ album_id, album_name, release_date, picture_url }) => { 
            return {
                album_id,
                album_name,
                release_date: formatDate(release_date),
                picture_url, 
            };
        });

        res.render("singleArtist", {
            title: `${artist.artist_name} - Artist Details`,
            artists: [artistData], // Wrap artistData in an array
            albums: formattedAlbums
        });
    } catch (err) {
        console.error('Error fetching artist details:', err);
        res.status(500).render('error', {
            message: 'Failed to fetch artist details',
            error: err
        });
    }
}async function getSingleArtistGet(req, res) {
    const id = req.params.id;
    console.log(id);
    try {
        const { artist, albums } = await db.searchArtist(id);
        console.log(artist);

        if (!artist) {
            return res.status(404).render('error', {
                message: 'Artist not found',
                error: { status: 404 }
            });
        }

        const artistData = {
            ...artist,
            birthdate: formatDate(artist.birthdate),
            active_status: formatActiveStatus(artist.active_status)
        };
            
        const formattedAlbums = albums.map(( {album_id, album_name, release_date, picture_url }) => { 
        const formattedDate = formatDate(release_date)
         return {
                album_id,
                album_name,
                release_date: formattedDate,
                picture_url, 
            };
    });
        res.render("singleArtist", {
            title: `${artist.artist_name} - Artist Details`,
            artists: artistData,
            albums: formattedAlbums
        });
    } catch (err) {
        console.error('Error fetching artist details:', err);
        res.status(500).render('error', {
            message: 'Failed to fetch artist details',
            error: err
        });
    }
}

async function deleteSingleArtistPost(req, res) {
    const artistId = req.params.id;
    try {
        await db.deleteArtist(artistId);
        res.redirect("/artists");
    } catch (err) {
        console.error('Error deleting artist:', err);
        res.status(500).render('error', {
            message: 'Failed to delete artist',
            error: err
        });
    }
}

async function getEditArtistForm(req, res) {
    const artistId = req.params.id;
    try {
        const { artist } = await db.searchArtist(artistId);
        if (!artist) {
            return res.status(404).render('error', {
                message: 'Artist not found',
                error: { status: 404 }
            });
        }
        
        console.log("Artist data for edit form:", artist); // Add this line for debugging

        res.render("editArtist", {
            title: `Edit ${artist.artist_name}`,
            artist: artist
        });
    } catch (err) {
        console.error('Error fetching artist for editing:', err);
        res.status(500).render('error', {
            message: 'Failed to fetch artist for editing',
            error: err
        });
    }
}


async function updateArtistPost(req, res) {
    console.log("updateArtistPost called");
    console.log("Request body:", req.body);

    const artistId = req.params.id;
    try {
        const { name, country, birthdate, active_status, picture_url } = req.body;

        if (!name || name.trim() === '') {
            throw new Error("Artist name is required");
        }

        await db.updateArtist(
            artistId,
            name.trim(),
            country || null,
            birthdate || null,
            active_status === 'on',
            picture_url || null
        );

        res.redirect(`/artists/${artistId}`);
    } catch (err) {
        console.error('Error updating artist:', err);
        res.status(500).render('error', {
            message: 'Failed to update artist',
            error: err.message
        });
    }
}
module.exports = {
    getAllArtists,
    createArtistsGet,
    createArtistsPost,
    getSingleArtistGet,
    deleteSingleArtistPost,
    getEditArtistForm,
    updateArtistPost
};