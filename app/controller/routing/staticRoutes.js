module.exports = function (app) {

    const orm = require("../../database/orm.js");

    app.get("/", function (req, res) {
        res.render("homeSignedOut", { signedIn: false });
    });

    app.get("/app/:eater_id", function (req, res) {
        orm.getEater(req.params.eater_id, function (error, result) {
            if (error) {
                console.log(error);
                return res.sendStatus(500);
            }
            console.log(result[0]);
            res.render("homeSignedIn", {
                signedIn: true,
                eater: result[0]
            });
        });
    });
    };
