const pool = require("./pool")

/* 

create query to get all artists
create query to get create an artist 
create query to search for an artist 
create query to delete an artist



create query to get all albums
create query to get create an album
create query to search for an album
create query to delete an album

*/ 

async function getAllArtists() { 
    const { rows } = await pool.query("SELECT * FROM artist");
    return rows;
}


async function insertArtist(artistName, country, birthDate, activeStatus, pictureUrl) {
    const client = await pool.connect();
    try {
        const isActive = activeStatus === 'active';
        
        const result = await client.query(
            "INSERT INTO artist (artist_name, country, birthdate, active_status, picture_url) VALUES($1, $2, $3, $4, $5) RETURNING artist_id",
            [artistName, country, birthDate, isActive, pictureUrl]
        );
        console.log(`Artist inserted with artist_id: ${result.rows[0].artist_id}`);
        return result.rows[0].artist_id;
    } catch (err) {
        console.error('Error inserting artist:', err);
        throw err;
    } finally {
        client.release();
    }
}


async function searchArtist(artistId) { 
    const { rows } = await pool.query("SELECT * FROM artist WHERE artist.artist_id = $1", [artistId]);
    return rows;
}


async function deleteArtist(artistId) { 
    await pool.query("DELETE FROM artist WHERE artist.artist_id = $1", [artistId]);
}



async function getAllAlbums() { 
    const { rows } = await pool.query("SELECT * FROM album");
    return rows;
}


async function insertAlbum(title, artistName, releaseDate, pictureUrl) { 
    const client = await pool.connect(); 
    try {
        await client.query('BEGIN');

        const artistQuery = `
          INSERT INTO artist (artist_name)
          VALUES ($1)
          ON CONFLICT (artist_name) DO UPDATE SET artist_name = EXCLUDED.artist_name
          RETURNING artist_id
        `;
    
        const artistResult = await client.query(artistQuery, [artistName]);
        const artistId = artistResult.rows[0].artist_id;
    
        
        const albumQuery = `
          INSERT INTO album (album_name, artist_id, release_date, picture_url)
          VALUES ($1, $2, $3, $4)
          RETURNING album_id
        `;
    
        const albumValues = [title, artistId, releaseDate || null, pictureUrl || null];
        const albumResult = await client.query(albumQuery, albumValues);
        const albumId = albumResult.rows[0].album_id;
    
        await client.query('COMMIT');
    
        console.log(`Album inserted successfully with id: ${albumId}`);
        return { artistId, albumId };
    
      } catch (e) {
        await client.query('ROLLBACK');
        throw e;
      } finally {
        client.release();
      }
}
    
    



async function searchAlbum(albumId) {
    const { rows } = await pool.query("SELECT * FROM album WHERE album.album_id = $1", [albumId]);
    return rows; 
}

async function deleteAlbum(albumId) { 
    await pool.query("DELETE FROM album WHERE album.album_id = $1", [albumId]);
}


module.exports = {
    getAllArtists, 
    insertArtist, 
    searchArtist,
    deleteArtist,
    getAllAlbums,
    insertAlbum,
    searchAlbum, 
    deleteAlbum
}

