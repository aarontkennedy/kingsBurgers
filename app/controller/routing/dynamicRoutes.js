module.exports = function (app) {

    const orm = require("../../database/orm.js");
    let cachedBurgerSuggestionsJSON = null;

    app.get("/autosuggest/burgers", function (req, res) {
        //console.log(req.query.query);
        orm.searchBurgerName(req.query.query, function (error, results) {
            if (error) {
                console.log(error);
                return res.sendStatus(500);
            }

            //console.log(results);
            if (results.length) {
                let suggestions = [];
                for (let i = 0; i < results.length; i++) {
                    suggestions.push({
                        value: results[i].name,
                        data: results[i].id,
                        description: results[i].description
                    });
                }
                return res.json({ suggestions: suggestions });
            }
            else {
                // no valid burger names were returned
                // we can suggest names...
                if (cachedBurgerSuggestionsJSON) {
                    //console.log("returning cached buger suggestions!");
                    return res.json(cachedBurgerSuggestionsJSON);
                }

                orm.getBurgers(function (error, results) {
                    if (error) {
                        console.log(error);
                        return res.sendStatus(500);
                    }

                    let suggestions = [];
                    for (let i = 0; i < results.length; i++) {
                        suggestions.push(results[i].name);
                    }
                    cachedBurgerSuggestionsJSON = { suggestions: suggestions };
                    return res.json(cachedBurgerSuggestionsJSON);
                }, 5);

            }

        });
    });

    app.post("/api/addBurger", function (req, res) {
        //console.log(req);
        if (!req.body.name || !req.body.description) {
            return res.sendStatus(400);
        }
        orm.addBurger(req.body.name,
            req.body.description,
            function (error, result) {
                if (error) {
                    console.log(error);
                    return res.sendStatus(500);
                }
                //console.log(result);
                return res.json({
                    id: result.insertID,
                    name: req.body.name,
                    description: req.body.description
                });
            });
    });

    app.post("/api/addBurgerEaten", function (req, res) {
        //console.log(req.body);
        if (!req.body.burger_id || !req.body.eater_id) {
            return res.sendStatus(400);
        }

        orm.addBurgerEaten(req.body.eater_id,
            req.body.burger_id,
            req.body.rating,
            function (error, result) {
                if (error) {
                    //console.log(error);
                    return res.sendStatus(500);
                }
                //console.log(result);
                return res.json({
                    id: result.insertID,
                    eater_id: req.body.eater_id,
                    burger_id: req.body.burger_id,
                    rating: req.body.rating
                });
            });
    });

    app.get("/api/burgersEaten/:eater_id", function (req, res) {
        if (!req.params.eater_id) {
            return res.sendStatus(400);
        }

        orm.getBurgersEaten(req.params.eater_id,
            function (error, result) {
                if (error) {
                    console.log(error);
                    return res.sendStatus(500);
                }
                //console.log(result);
                return res.json(result);
            });
    });


};