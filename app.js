const express = require("express"); 

const app = express();
const indexRouter = require("./routes/indexRouter")
const artistsRouter = require("./routes/artistsRouter")
const albumsRouter = require("./routes/albumsRouter")

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter)
app.use("/artist", artistsRouter)
app.use("/albums", albumsRouter)

const PORT = 3000; 
app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));

