module.exports = function (app) {

    const orm = require("../../models/orm.js");
    let cachedBurgerSuggestionsJSON = null;

    app.post("/api/eaters", function (req, res) {
        //console.log("/api/eaters");
        console.log(req.body);
        if (!req.body.googleID) {
            return res.sendStatus(400);
        }

        orm.addEater(req.body.googleID,
            req.body.first,
            req.body.last,
            req.body.email,
            req.body.imageURL,
            function (error, result) {
                if (error) {
                    console.log(error);
                    return res.sendStatus(500);
                }
                //console.log(result);
                return res.json(result);
            });
    });

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
                        suggestions.push({
                            value: results[i].name,
                            data: results[i].id,
                            description: results[i].description
                        });
                    }
                    cachedBurgerSuggestionsJSON = { suggestions: suggestions };
                    return res.json(cachedBurgerSuggestionsJSON);
                }, 5);

            }

        });
    });

    app.post("/api/burgers", function (req, res) {
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
                    id: result.insertId,
                    name: req.body.name,
                    description: req.body.description
                });
            });
    });

    app.get("/api/count", function (req, res) {
        //console.log(req);

        orm.getRowCountAllTables(function (error, result) {
            if (error) {
                console.log(error);
                return res.sendStatus(500);
            }
            console.log(result);
            let retVal = null;
            if (result.length) {
                retVal = {};
                retVal["burgers"] = result[0].numBurgers;
                retVal["burgersEaten"] = result[0].numBurgersEaten;
                retVal["eaters"] = result[0].numEaters; 
            }
            console.log(retVal);
            return res.json(retVal);
        });
    });

    // creates a record of a particular burger eaten by a particular person
    app.post("/api/burgerseaten", function (req, res) {
        console.log(req.body);
        if (!req.body.burger_id || !req.body.eater_id) {
            return res.sendStatus(400);
        }

        orm.addBurgerEaten(req.body.eater_id,
            req.body.burger_id,
            req.body.rating,
            function (error, result) {
                if (error) {
                    console.log(error);
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

    app.get("/api/burgerseaten/:eater_id", function (req, res) {
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

    app.get("/api/burgersuggestion/:eater_id", function (req, res) {
        if (!req.params.eater_id) {
            return res.sendStatus(400);
        }

        orm.getBurgerSuggestions(req.params.eater_id, 1, 
            function (error, result) {
                if (error) {
                    console.log(error);
                    return res.sendStatus(500);
                }
                //console.log(result);
                return res.json(result);
            });
    });

    app.get("/api/threeburgersuggestions/:eater_id", function (req, res) {
        if (!req.params.eater_id) {
            return res.sendStatus(400);
        }

        orm.getBurgerSuggestions(req.params.eater_id, 3,
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