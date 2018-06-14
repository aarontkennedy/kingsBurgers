const connection = require("./mySQLconnection.js");

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
const orm = {
    searchBurgerName: function (textInput, callback) {
        const queryString = `SELECT * FROM burgers WHERE name LIKE ? LIMIT 5;`;
        connection.query(queryString, ["%" + textInput + "%"], function (err, result) {
            callback(err, result);
        });
    },
    getBurgers: function (callback, limit = -1) {
        var queryString = "SELECT * FROM burgers ORDER BY name";
        if (limit > 0) {
            queryString += " LIMIT " + limit;
        }
        queryString += ";";
        connection.query(queryString, function (err, result) {
            callback(err, result);
        });
    },
    addBurger: function (name, description, callback) {
        var queryString =
            "INSERT INTO burgers (`name`, `description`) VALUES (?, ?);";

        connection.query(queryString,
            [name, description],
            function (err, result) {
                callback(err, result);
            });
    }
};

module.exports = orm;
