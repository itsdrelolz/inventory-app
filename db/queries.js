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
    const { rows } = await pool.query("SELECT * FROM artist")
    return rows;
}


async function insertArtist(artistName, country, birthDate, activeStatus, pictureUrl) {
    await pool.query("INSERT INTO artist (artist_name, country, birthdate, active_status, picture_url) VALUES($1, $2, $3, $4, $5)", [artistName, country, birthDate, activeStatus, pictureUrl])
}


async function searchArtist(artistId) { 
    const { rows } = await pool.query("SELECT * FROM artist WHERE artist_id = $1", [artistId])
    return rows;
}


async function deleteArtist(artistId) { 
    await pool.query("DELETE FROM artist WHERE artist_id = $1", [artistId])
}



async function getAllAlbums() { 
    const { rows } = await pool.query("SELECT * FROM album")
    return rows;
}


async function insertAlbum(albumName, releaseDate, artistId, pictureUrl) { 
    await pool.query("INSERT INTO album (album_name, release_date, artist_id, picture_url", [albumName, releaseDate, artistId, pictureUrl])
}


async function searchAlbum(albumId) {
    const { rows } = await pool.query("SELECT * FROM album WHERE album_id = $1", [albumId])
    return rows;
}

async function deleteAlbum(albumId) { 
    await pool.query("DELETE FROM album WHERE album_id = $1", [albumId])
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

