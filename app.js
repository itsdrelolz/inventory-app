const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/indexRouter");
const artistsRouter = require("./routes/artistsRouter");
const albumsRouter = require("./routes/albumsRouter");

const app = express();

app.set("view engine", "ejs");
app.use(expressLayouts); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/", indexRouter);
app.use("/artist", artistsRouter);
app.use("/albums", albumsRouter);

app.use((err, req, res, next) => { 
    console.error(err.stack); 
    res.status(err.status || 500);
    res.render("error", {
        message: err.message || "Internal Server Error",
        error: err
    });
});

const PORT = 3000; 
app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));

