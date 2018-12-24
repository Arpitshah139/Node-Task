/*************************************
 * Express And Routing Module Handling
 *************************************/


let express = require('express');
config = require('./configs');
morgan = require('morgan');
bodyParser = require('body-parser');
methodOverride = require('method-override');
session = require('express-session');
jwt = require('jsonwebtoken');
multer = require('multer'); //middleware for handling multipart/form-data
multiparty = require('multiparty');
/*For File Upload*/
cors = require('cors'); //For cross domain error
fs = require('file-system');
timeout = require('connect-timeout');
compress = require('compression');


module.exports = function () {
    let app = express();
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress({threshold: 2}));
    }
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cors());

    // app.use(morgan('combined')); // Just uncomment this line to show logs.

    // =======   Settings for CORS
    app.use((req, res, next) => {
        // res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use(timeout(120000));
    app.use(haltOnTimedout);

    function haltOnTimedout(req, res, next){
        if (!req.timedout) next();
    }

    app.use(session({
        cookie: { maxAge: 30000 },
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    // Routings

    require('../app/routes/DashboardRoutes')(app, express);
    require('../app/routes/LoginRoutes')(app, express);

    return app;

};
