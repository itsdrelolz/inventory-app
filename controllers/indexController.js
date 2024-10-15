const db = require('../db/queries');

async function getInventory(req, res, next) {
    try { 

        const artists = await db.getAllArtists();
        const formattedArtists = artists.map(({ id, artist_name, country, birthdate, active_status, picture_url }) => {
            const formattedStatus = active_status ? "Active" : "Not Active";
            const formattedDate = new Date(birthdate).toLocaleDateString('en-US');
            return {
                id,
                name: artist_name,
                country,
                birthdate: formattedDate,
                active_status: formattedStatus,
                picture_url
            };
        }).slice(0, 5);


        const albums = await db.getAllAlbums();
        const formattedAlbums = albums.map(( { id, artist_name, album_name, release_date ,picture_url }) => {
            const formattedRelease = new Date(release_date).toLocaleDateString('en-US');
           return {
            id,
            album_name,
            release_date: formattedRelease,
            picture_url,
            artist_name
           };
        }).slice(0, 3);

        
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

