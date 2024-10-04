const db = require('../db/queries')


async function getAllArtists(req, res, next) {
    try {
        const artists = await db.getAllArtists();
        const formattedArtists = artists.map(({ artist_name, country, birthdate, active_status, picture_url }) => {
            const formattedStatus = active_status ? "Active" : "Not Active";
            const formattedDate = new Date(birthdate).toLocaleDateString('en-US');
            return {
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
        const newArtistId = await db.insertArtist(name, country, birthdate, active_status, picture_url);
        res.redirect('/artists'); 
    } catch (err) {
        console.error('Error creating artist:', err);
        res.status(500).render('error', { 
            message: 'Failed to create artist', 
            error: err 
        });
    }
}

module.exports = { 
    getAllArtists,
    createArtistsGet,
    createArtistsPost
}
