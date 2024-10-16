const db = require('../db/queries')
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
            ...artist,
            birthdate: formatDate(artist.birthdate),
            active_status: formatActiveStatus(artist.active_status)
        };

        res.render("singleArtist", {
            title: `${artist.artist_name} - Artist Details`,
            artist: artistData,
            albums: albums
        });
    } catch (err) {
        console.error('Error fetching artist details:', err);
        res.status(500).render('error', {
            message: 'Failed to fetch artist details',
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
   const id = req.params.id;
   console.log(id)
}


module.exports = { 
    getAllArtists,
    createArtistsGet,
    createArtistsPost,
    getSingleArtistGet,
    deleteSingleArtistPost
}
