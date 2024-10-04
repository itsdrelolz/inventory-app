const db = require('../db/queries');

async function getInventory(req, res) {
    try { 

        const artists = await db.getAllArtists();
        const albums = await db.getAllAlbums();

        const formattedArtists = artists.map(({ name, country, birthdate, active_status, picture_url }) => ({
            name,
            country,
            birthdate,
            active_status,
            picture_url
        }));

        const formattedAlbums = albums.map(({ album_name, release_date, picture_url }) => ({
            album_name,
            release_date,
            picture_url
        }));

        
        res.render("dashboard", {
            title: "Inventory",
            formattedArtists,    
            formattedAlbums      
        });
    } catch (error) {
        console.error("Error fetching inventory: ", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { 
    getInventory
};

