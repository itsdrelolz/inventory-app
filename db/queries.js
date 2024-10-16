const pool = require("./pool")



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
    try {
        
        const artistResult = await pool.query("SELECT * FROM artist WHERE artist.artist_id = $1", [artistId]);
        
        // Query for artist's albums
        const albumsResult = await pool.query(`
            SELECT album.*, artist.artist_name AS artist_name
            FROM album
            JOIN artist ON album.artist_id = artist.artist_id
            WHERE artist.artist_id = $1
        `, [artistId]);

        
        const artist = artistResult.rows[0]; 
        const albums = albumsResult.rows;

        return {
            artist: artist,
            albums: albums
        };
    } catch (error) {
        console.error("Error in searchArtist:", error);
        throw error;
    }
}

async function deleteArtist(artistId) { 
    await pool.query("DELETE FROM artist WHERE artist.artist_id = $1", [artistId]);
}

async function updateArtist(artistId, artistName, country, birthDate, activeStatus, pictureUrl) {
    if (!artistName) {
        throw new Error("Artist name is required");
    }

    const client = await pool.connect();
    try {
        const isActive = activeStatus === 'active';
        
        const result = await client.query(
            `UPDATE artist 
             SET artist_name = $1, country = $2, birthdate = $3, active_status = $4, picture_url = $5
             WHERE artist_id = $6
             RETURNING artist_id`,
            [artistName, country || null, birthDate || null, isActive, pictureUrl || null, artistId]
        );
        
        console.log(`Artist updated with artist_id: ${result.rows[0].artist_id}`);
        return result.rows[0].artist_id;
    } catch (err) {
        console.error('Error updating artist:', err);
        throw err;
    } finally {
        client.release();
    }
}

async function getAllAlbums() { 
    const { rows } = await pool.query(`SELECT album.*, artist.artist_name AS artist_name
                                       FROM album
                                       JOIN artist ON album.artist_id = artist.artist_id`);
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
const { rows } = await pool.query(`
  SELECT album.*, artist.artist_name AS artist_name
  FROM album
  JOIN artist ON album.artist_id = artist.artist_id
  WHERE album.album_id = $1
`, [albumId]); 
    return rows; 
}

async function deleteAlbum(albumId) { 
    await pool.query("DELETE FROM album WHERE album.album_id = $1", [albumId]);
}
// in progress 
async function updateAlbum(albumId, title, artistName, releaseDate, pictureUrl) {
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
          UPDATE album 
          SET album_name = $1, artist_id = $2, release_date = $3, picture_url = $4
          WHERE album_id = $5
          RETURNING album_id
        `;
        const albumValues = [title, artistId, releaseDate || null, pictureUrl || null, albumId];
        const albumResult = await client.query(albumQuery, albumValues);
        const updatedAlbumId = albumResult.rows[0].album_id;

        await client.query('COMMIT');

        console.log(`Album updated successfully with id: ${updatedAlbumId}`);
        return { artistId, albumId: updatedAlbumId };

    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}
module.exports = {
    getAllArtists, 
    insertArtist, 
    searchArtist,
    deleteArtist,
    updateArtist,
    getAllAlbums,
    insertAlbum,
    searchAlbum, 
    deleteAlbum,
    updateAlbum
}

