module.exports = function (app) {

    const path = require("path");

    app.get("/", function (req, res) {
        res.render("homeSignedIn");
    });

    app.get("/styles/style.css", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/styles/style.css"));
    });

    app.get("/js/app.js", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/js/app.js"));
    });

};