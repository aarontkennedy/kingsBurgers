// Dependencies
// =========================================================
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

// Sets up the Express App
// =========================================================
let app = express();
const PORT = process.env.PORT || 3000;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ layoutsDir: "app/public/views/layouts", 
                                  defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set('views', 'app/public/views');

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

// Get the routes
require('./app/routing/staticRoutes.js')(app);
require('./app/routing/dynamicRoutes.js')(app);
require('./app/routing/oauthRoutes.js')(app);

// Starts the server to begin listening
// =========================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
