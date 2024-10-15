const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const app = express();

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "./layouts/main");

// Middleware
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
const indexRouter = require("./routes/indexRouter");
const artistsRouter = require("./routes/artistsRouter");
const albumsRouter = require("./routes/albumsRouter");

app.use("/", indexRouter);
app.use("/artists", artistsRouter);
app.use("/albums", albumsRouter);


app.use((req, res, next) => {
    console.log(`404 Not Found: ${req.method} ${req.url}`);
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use((err, req, res, next) => {
    console.error(`Error ${err.status || 500}: ${err.message}`);
    console.error(`Requested URL: ${req.url}`);
    console.error(`Stack trace: ${err.stack}`);
    
    res.status(err.status || 500);
    res.render('error', {
        title: "Error",
        message: err.message,
        error: process.env.NODE_ENV === 'development' ? err : {},
        layout: false
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));