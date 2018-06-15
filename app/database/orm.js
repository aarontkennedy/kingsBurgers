const pool = require("./mySQLconnection.js");

// Object Relational Mapper (ORM) Kind of...

// this function provides the meat and potatoes of all my database calls
// it enables me to provide each call a little bit of error handling and
// it also takes care of freeing up connection resources after each call
// back to the pool
function performDatabaseCall(queryStr, parameters = null, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(err);
            connection.release();
            callback(err, { "code": 100, "status": "Error in connection database" });
        }
        //console.log('connected as id ' + connection.threadId);

        // conduct the actual requested query
        connection.query(queryStr, parameters, function (err, result) {
            connection.release();
            callback(err, result);
        });

        // must be listening for an error event while the query is running in case
        // it can't return?
        connection.on('error', function (err) {
            return callback(err, { "code": 100, "status": "Error in connection database" });
        });
    });
}


const orm = {
    searchBurgerName: function (textInput, callback) {
        const queryString = `SELECT * FROM burgers WHERE name LIKE ? LIMIT 5;`;
        performDatabaseCall(queryString, ["%" + textInput + "%"], callback);
    },
    getBurgers: function (callback, limit = -1) {
        var queryString = "SELECT * FROM burgers ORDER BY name";
        if (limit > 0) {
            queryString += " LIMIT " + limit;
        }
        queryString += ";";
        performDatabaseCall(queryString, callback);
    },
    addBurger: function (name, description, callback) {
        var queryString =
            "INSERT INTO burgers (`name`, `description`) VALUES (?, ?);";
        performDatabaseCall(queryString, [name, description], callback);
    },
    addEater: function (id, name, callback) {
        var queryString =
            'INSERT INTO eaters (`google_id`, `name`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `name`=?;';

        performDatabaseCall(queryString, [id, name, name], callback);
    },
    addBurgerEaten: function (eaterID, burgerID, burgerRating, callback) {
        var queryString =
            'INSERT INTO burgersEaten (`eater_id`, `burger_id`, `rating`) VALUES (?, ?, ?)';
        performDatabaseCall(queryString, [eaterID, burgerID, burgerRating], callback);
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
        performDatabaseCall(queryString, [eaterID], callback);

    },
    getBurgersEatenDifferentCount: function (eaterID, callback) {
        var queryString = `SELECT burgers.name AS burgerName, COUNT(*) AS burgerCount
            FROM burgers
            INNER JOIN burgersEaten
            ON burgers.id = burgersEaten.burger_id
            INNER JOIN eaters
            ON eaters.google_id = ?
            GROUP BY burgerName;`;

        performDatabaseCall(queryString, [eaterID], callback);
    },
    getRowCountAllTables: function (callback) {
        var queryString = "SELECT TABLE_NAME, TABLE_ROWS ";
        queryString += "FROM `information_schema`.`tables` " 
        queryString += "WHERE `table_schema` = 'kingsBurgers_db';";
        performDatabaseCall(queryString, callback);
    },
};

module.exports = orm;
