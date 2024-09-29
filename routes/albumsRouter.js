const Router = require("express") 

const albumsController = require("../controllers/albumsController")
const albumsRouter = Router();


albumsRouter.get("/albums", albumsController.getAllAlbums)

albumsRouter.get("/albums/create", )



module.exports = albumsRouter;