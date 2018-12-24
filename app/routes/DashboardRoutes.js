/********************
 * Dashbnoard Routes
 * 1. /getcharts -
 *********************/

module.exports = (app, express) => {
    const router = express.Router();
    const DashboardController = require('./../controllers/dashboardController');
    const Global = require('./../services/Global');

    router.post('/getdata', Global.isAuthorised, (req, res, next) => {
        const dashboardController = (new DashboardController()).boot(req, res);
        console.log("here we are");
        return dashboardController.GetData();
    });




    app.use(config.baseApiUrl + 'dashboard/', router);
};