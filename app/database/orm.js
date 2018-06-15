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
    },
    addEater: function (id, name, callback) {
        var queryString =
            'INSERT INTO eaters (`google_id`, `name`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `name`=?;';

        connection.query(queryString,
            [id, name, name],
            function (err, result) {
                callback(err, result);
            });
    },
    addBurgerEaten: function (eaterID, burgerID, burgerRating, callback) {
        var queryString =
            'INSERT INTO burgersEaten (`eater_id`, `burger_id`, `rating`) VALUES (?, ?, ?)';
        connection.query(queryString,
            [eaterID, burgerID, burgerRating],
            function (err, result) {
                callback(err, result);
            });
    },
    getBurgersEaten: function (eaterID, callback) {
        var queryString = `SELECT burgers.name AS burgerName,
        rating AS burgerRating, 
        DATE_FORMAT(date, "%m/%d/%Y") AS burgerDate
        FROM burgers
        INNER JOIN burgersEaten
        ON burgers.id = burgersEaten.burger_id
        INNER JOIN eaters
        ON eaters.google_id = ?
        ORDER BY burgerDate;`;
        connection.query(queryString, [eaterID], function (err, result) {
                callback(err, result);
            });
    } 
};

module.exports = orm;
