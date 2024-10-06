const db = require('../db/queries')
const { formatDate, formatActiveStatus } = require('../utils/formatters');


async function getAllArtists(req, res, next) {
    try {
        const artists = await db.getAllArtists();
        const formattedArtists = artists.map(({artist_id, artist_name, country, birthdate, active_status, picture_url }) => {
            const formattedStatus = active_status ? "Active" : "Not Active";
            const formattedDate = new Date(birthdate).toLocaleDateString('en-US');
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
        const artistData = await db.searchArtist(id);
        if (!artistData) {
            return res.status(404).render('error', {
                message: 'Artist not found',
                error: { status: 404 }
            });
        }
        
        const artist = {
            ...artistData,
            birthdate: formatDate(artistData.birthdate),
            active_status: formatActiveStatus(artistData.active_status)
        };
        console.log(artist);
        res.render("singleArtist", {
            title: `${artist.name} - Artist Details`,
            artists: artist 
        });
    } catch (err) {
        console.error('Error fetching artist details:', err);
        res.status(500).render('error', {
            message: 'Failed to fetch artist details',
            error: err
        });
    }
}


module.exports = { 
    getAllArtists,
    createArtistsGet,
    createArtistsPost,
    getSingleArtistGet
}
