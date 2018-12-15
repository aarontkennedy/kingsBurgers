const databaseConnectionInfo = require("./mySQLconnection.js");
const mysql = require("mysql");
const pool = mysql.createPool(databaseConnectionInfo);

// Object Relational Mapper (ORM) Kind of...

// this function provides the meat and potatoes of all my database calls
// it enables me to provide each call a little bit of error handling and
// it also takes care of freeing up connection resources after each call
// back to the pool
function performDatabaseCall(queryStr, parameters = null, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            //console.log(err);
            callback(err, { "code": 100, "status": "Error in connection database" });
        }
        //console.log('connected as id ' + connection.threadId);

        // conduct the actual requested query
        connection.query(queryStr, parameters, function (err, result) {
            connection.release();
            callback(err, result);
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
    addEater: function (id, first, last, email, imageURL, callback) {
        var queryString =
            `INSERT INTO eaters (google_id, first, last, email, imageURL, date_created, last_visit) 
            VALUES (?, ?, ?, ?, ?, NOW(), NOW()) 
            ON DUPLICATE KEY 
            UPDATE first=?, last=?, email=?, imageURL=?, last_visit=NOW();`;

        performDatabaseCall(queryString,
            [
                id,
                first,
                last,
                email,
                imageURL,
                first, 
                last, 
                email, 
                imageURL],
            callback);
    },
    getEater: function (id, callback) {
        var queryString = 'SELECT * FROM eaters WHERE google_id LIKE ?';
        performDatabaseCall(queryString, [id], callback);
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
            ORDER BY burgerDate DESC;`;
        performDatabaseCall(queryString, [eaterID], callback);

    },
    getBurgersEatenDifferentCount: function (eaterID, callback) {
        var queryString = `SELECT burgers.name AS burgerName, COUNT(*) AS burgerCount
            FROM burgers
            INNER JOIN burgersEaten ON burgersEaten.burger_id = burgers.id
            INNER JOIN eaters ON eaters.google_id = burgersEaten.eater_id
            WHERE eaters.google_id = ?
            GROUP BY burgerName;`;

        performDatabaseCall(queryString, [eaterID], callback);
    },
    getRowCountAllTables: function (callback) {
        var queryString = "SELECT TABLE_NAME, TABLE_ROWS ";
        queryString += "FROM `information_schema`.`tables` "
        queryString += "WHERE `table_schema` = '" + databaseConnectionInfo.database + "';";
        performDatabaseCall(queryString, callback);
    },
};

module.exports = orm;
