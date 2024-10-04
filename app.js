const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const app = express();
app.set("view engine", "ejs");


const indexRouter = require("./routes/indexRouter");
const artistsRouter = require("./routes/artistsRouter"); 
const albumsRouter = require("./routes/albumsRouter"); 

app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("layout", "./layouts/main"); 

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", indexRouter);
app.use("/artists", artistsRouter)
app.use("/albums", albumsRouter)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500);
    res.render("error", {
        message: err.message || "Internal Server Error",
        error: err,
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));
