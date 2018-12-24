/***********************************
 * Database (Mongodb) Configurations
 ************************************/

let config = require('./configs');
let mongoose = require('mongoose');

module.exports = function () {
    return mongoose.connect(config.db.url, config.db.conn_config).then(
        () => {
            console.log('Connected to Database Successfully.')
        },
        (err) => {
            console.log('Database connection Failed', err)
        }
    );
};