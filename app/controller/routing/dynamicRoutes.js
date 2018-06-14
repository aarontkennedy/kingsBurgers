module.exports = function (app) {

    const path = require("path");
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
                    suggestions.push({value: results[i].name, 
                                      data: results[i].id,
                                      description: results[i].description });
                }
                return res.json({suggestions: suggestions});
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
                    cachedBurgerSuggestionsJSON = {suggestions: suggestions};
                    return res.json(cachedBurgerSuggestionsJSON);
                }, 5);

            }

        });
    });

    app.post("/api/addBurger", function (req, res) {
        console.log(req);
        if (!req.body.name || !req.body.description) {
            return res.sendStatus(400);
        }
        orm.addBurger(req.body.name, 
                      req.body.description,
                    function (error, result){
                        if (error) {
                            console.log(error); 
                            return res.sendStatus(500);
                        }
                        console.log(result);
                        return res.json({id: result.insertID, 
                                         name: req.body.name, 
                                         description: req.body.description });
                    });
    });

};