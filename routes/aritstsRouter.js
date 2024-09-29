const Router = require("express") 

const artistsRouter = Router();
const artistController = require('../controllers/artistsController')



artistsRouter("/artists", artistController.getAllArtists)
artistsRouter("/artists/create", )
artistsRouter("/artists/:artistId", )


module.exports = artistsRouter;