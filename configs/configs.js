/***************
 * Configurations
 ****************/

module.exports = {
    db: {
        url: process.env.MONGODB_CONNECTION_STRING,
        port: 27017,
        conn_config: {
            reconnectTries: 60,
            socketTimeoutMS: 0,
            keepAlive: true,
            reconnectInterval: 1000,
            poolSize: 10,
            bufferMaxEntries: 2000,
            useNewUrlParser: true
        }
    },
    sessionSecret: 'super',
    serverPort: 3000,
    apiUrl: 'http://localhost:3000',
    enum: {
        response: {
            Error: "Error",
            Success: "Success"
        },
        logtype: {
            Error: "Error",
            Success: "Success",
            Info: "Info",
            Debug: "Debug",
            Warning: "Warning"
        },
        collections: {
            clients: "clients",
        },
        cipherSalt: "secret",
        salt: "$2a$10$BSADjmNlEoYehKScGqZRBu",
        excludeRoutes: []
    },

    baseApiUrl: '/',
    api: {
        parameters: {
            forgotpassword: [
                "uname",
                "subd"
            ],
            validatelogin: [
                "username",
                "password",
                "subdomain"
            ],
            validatetoken: [
                "token"
            ],
            validatemobile: [
                "umobile"
            ],
            comprofile: [
                "gst",
                "cmpnm",
                "city",
                "st",
                "subdmn",
                "stcode",
                "pin",
                "phone",
                "gstdt",
                "ad1",
                "ad2",
                "url"
            ],
            menu: [
                "token"
            ],
            validateemail: [
                "uemail"
            ],
            validateusername: [
                "ulogin",
                "subdomain"
            ],
            createUser: [
                "clientid",
                "username",
                "menu",
                "email",
                "umobile",
                "token",
                "password"
            ],
            getuserdetails: [
                "clientid",
                "username"
            ],
            changepassword: [
                "token",
                "current",
                "password",
                "ulogin"
            ]
        }
    },
    credentials: {
        salt: "$2a$10$BSADjmNlEoYehKScGqZRBu"
    },
    httpcode: {
        OK: 200,
        BadRequest: 400,
        InternalServerError: 500,
        Created: 201,
        NoContent: 204,
        Forbidden: 403,
        NotFound: 404,
        Continue: 100,
        Switchingprotocols: 101,
        Processing: 102,
        Multiplechoices: 300,
        Movedpermanently: 301,
        Found: 302,
        Notmodified: 304,
        Useproxy: 305,
        Unauthorized: 401,
        forbidden: 403,
        Notfound: 404,
        Gone: 410,
        Internalservererror: 500,
        Notimplemented: 501,
        Badgateway: 502,
        Serviceunavailable: 503,
        Unknown: 999
    },
    message: {
        common_message: {
            InParameters: "Insufficient Parameters",
            ClientNotExists: "Client doesn`t Exists",
            ClientIsNotActive: "Client is Not Active",
            ChannelNotExists: "Channel doesn`t Exists",
            ChannelIsNotActive: "Channel is Not Active",
            AccountNotExists: "Account doesn`t Exists",
            AccountIsNotActive: "Account is Not Active",
            InvalidToken: "Token Invalid",
            QueryRelatedIssue: "Something is wrong in Query",
            InternalError: "Internal Error",
            NoExternalConfig: "No External component found for this call type",
            UserLoginNotFound: "This user Login does not exists.",
            MailFunctionError: "Internal Error in mail function",
            ForgotSuccessMail: "Please Check your mail for forgot link",
            PasswordUpdateSuccess: "Password updated Successfully",
            PasswordMismatch: "Both password should be same",
            NoDataFound: "No Data Found",
        }
        }
    };