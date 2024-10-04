const db = require('../db/queries');

async function getInventory(req, res, next) {
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


        const albums = await db.getAllAlbums();
        const formattedAlbums = albums.map(( { album_name, release_date ,picture_url }) => {
            const formattedRelease = new Date(release_date).toLocaleDateString('en-US');
           return {
            album_name,
            release_date: formattedRelease,
            picture_url
           };
        });

        
        res.render("dashboard", {
            title: "Inventory",
            artists : formattedArtists,    
            albums : formattedAlbums    
        });
    } catch (err) {
        console.error("Error fetching inventory data:", err);
        next(err)
    }
}

module.exports = { 
    getInventory
};

