/********************
 * Dashbnoard Routes

 *********************/

module.exports = (app, express) => {
    const router = express.Router();
    const LoginController = require('./../controllers/loginController');
    const Global = require('./../services/Global');

    router.get('/hello',(req,res,next) => {
        const loginController = (new LoginController()).boot(req, res);
        return loginController.hi();


    });

    router.post('/validatelogin', Global.isAuthorised, (req, res, next) => {
        const loginController = (new LoginController()).boot(req, res);
        return loginController.ValidateLogin();
    });

    router.post('/validatetoken', Global.isAuthorised, (req, res, next) => {
        const loginController = (new LoginController()).boot(req, res);
        return loginController.ValidateToken();
    });


    router.post('/validateemail', Global.isAuthorised, (req, res, next) => {
        const loginController = (new LoginController()).boot(req, res);
        return loginController.ValidateEmail();
    });

    router.post('/validatemobile', Global.isAuthorised, (req, res, next) => {
        const loginController = (new LoginController()).boot(req, res);
        return loginController.ValidateMobile();
    });

    router.post('/createuser', Global.isAuthorised, (req, res, next) => {
        const loginController = (new LoginController()).boot(req, res);
        return loginController.CreateUser();
    });

    router.post('/getuserdetails', (req, res, next) => {
        const loginController = (new LoginController()).boot(req, res);
        return loginController.GetUserDetails();
    });


    router.post('/validateuser', (req, res, next) => {
        const loginController = (new LoginController()).boot(req, res);
        return loginController.ValidateUser();
    });

    router.post('/changepassword', (req, res, next) => {
        const loginController = (new LoginController()).boot(req, res);
        return loginController.ChangePassword();
    });


    app.use(config.baseApiUrl + 'login/', router);
};