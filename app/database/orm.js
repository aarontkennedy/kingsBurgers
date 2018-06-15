const pool = require("./mySQLconnection.js");

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
const orm = {
    searchBurgerName: function (textInput, callback) {
        pool.getConnection(function (err, connection) {

            if (err) {
                connection.release();
                callback(err, { "code": 100, "status": "Error in connection database" });
            }

            //console.log('connected as id ' + connection.threadId);

            const queryString = `SELECT * FROM burgers WHERE name LIKE ? LIMIT 5;`;
            connection.query(queryString, ["%" + textInput + "%"], function (err, result) {
                connection.release();
                callback(err, result);
            });

            connection.on('error', function (err) {
                return callback(err, { "code": 100, "status": "Error in connection database" });
            });
        });
    },
    getBurgers: function (callback, limit = -1) {
        pool.getConnection(function (err, connection) {

            if (err) {
                connection.release();
                callback(err, { "code": 100, "status": "Error in connection database" });
            }

            //console.log('connected as id ' + connection.threadId);

            var queryString = "SELECT * FROM burgers ORDER BY name";
            if (limit > 0) {
                queryString += " LIMIT " + limit;
            }
            queryString += ";";
            connection.query(queryString, function (err, result) {
                connection.release();
                callback(err, result);
            });

            connection.on('error', function (err) {
                return callback(err, { "code": 100, "status": "Error in connection database" });
            });
        });
    },
    addBurger: function (name, description, callback) {
        pool.getConnection(function (err, connection) {

            if (err) {
                connection.release();
                callback(err, { "code": 100, "status": "Error in connection database" });
            }

            //console.log('connected as id ' + connection.threadId);

            var queryString =
                "INSERT INTO burgers (`name`, `description`) VALUES (?, ?);";

            connection.query(queryString,
                [name, description],
                function (err, result) {
                    connection.release();
                    callback(err, result);
                });

            connection.on('error', function (err) {
                return callback(err, { "code": 100, "status": "Error in connection database" });
            });
        });
    },
    addEater: function (id, name, callback) {
        pool.getConnection(function (err, connection) {

            if (err) {
                connection.release();
                callback(err, { "code": 100, "status": "Error in connection database" });
            }

            //console.log('connected as id ' + connection.threadId);

            var queryString =
                'INSERT INTO eaters (`google_id`, `name`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `name`=?;';

            connection.query(queryString,
                [id, name, name],
                function (err, result) {
                    connection.release();
                    callback(err, result);
                });

            connection.on('error', function (err) {
                return callback(err, { "code": 100, "status": "Error in connection database" });
            });
        });
    },
    addBurgerEaten: function (eaterID, burgerID, burgerRating, callback) {
        pool.getConnection(function (err, connection) {

            if (err) {
                connection.release();
                callback(err, { "code": 100, "status": "Error in connection database" });
            }

            //console.log('connected as id ' + connection.threadId);

            var queryString =
                'INSERT INTO burgersEaten (`eater_id`, `burger_id`, `rating`) VALUES (?, ?, ?)';
            connection.query(queryString,
                [eaterID, burgerID, burgerRating],
                function (err, result) {
                    connection.release();
                    callback(err, result);
                });

            connection.on('error', function (err) {
                return callback(err, { "code": 100, "status": "Error in connection database" });
            });
        });
    },
    getBurgersEaten: function (eaterID, callback) {
        pool.getConnection(function (err, connection) {

            if (err) {
                connection.release();
                callback(err, { "code": 100, "status": "Error in connection database" });
            }

            //console.log('connected as id ' + connection.threadId);

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
                connection.release();
                callback(err, result);
            });

            connection.on('error', function (err) {
                return callback(err, { "code": 100, "status": "Error in connection database" });
            });
        });
    },
    getBurgersEatenDifferentCount: function (eaterID, callback) {
        pool.getConnection(function (err, connection) {

            if (err) {
                connection.release();
                callback(err, { "code": 100, "status": "Error in connection database" });
            }

            //console.log('connected as id ' + connection.threadId);

            var queryString = `SELECT burgers.name AS burgerName, COUNT(*) AS burgerCount
            FROM burgers
            INNER JOIN burgersEaten
            ON burgers.id = burgersEaten.burger_id
            INNER JOIN eaters
            ON eaters.google_id = ?
            GROUP BY burgerName;`;
            connection.query(queryString, [eaterID], function (err, result) {
                connection.release();
                callback(err, result);
            });

            connection.on('error', function (err) {
                return callback(err, { "code": 100, "status": "Error in connection database" });
            });
        });
    }
};

module.exports = orm;
