// Dependencies
// =========================================================
const express = require("express");
const bodyParser = require("body-parser");


// Sets up the Express App
// =========================================================
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// express will handle the static files
app.use(express.static('./client/build/'));

require('./controller/routes/apiRoutes.js')(app);

// this picks up any other routes and sends them to the react app to handle - needed?
app.get('*', function(req, res) {
  res.sendFile('./client/build/index.html' , { root : __dirname});
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
