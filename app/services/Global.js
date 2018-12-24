const config = require('./../../configs/configs');
const responseFormat = require('./../../configs/response');
const _ = require('lodash');
const requiredpath = require('./../../configs/requireParams');

class Global {
    constructor() {

    }

    async generateToken(data, ltype) {
        return new Promise(async (resolve, reject) => {
            try {
                let token;
                if (ltype === 'admin') {
                    token = jwt.sign({exp: (Date.now() / 1000) + 259200, data: data}, config.enum.cipherSalt);
                } else {
                    token = jwt.sign({exp: (Date.now() / 1000) + 86400, data: data}, config.enum.cipherSalt);
                }
                return resolve(token);
            } catch (err) {
                return reject(err);
            }
        });


    }

    static async isAuthorised(req, res, next) {
        try {
            let required_path = [];
            required_path = requiredpath(req.route.path);
            if (req.route.path === '/saverequest'){
                next();
            }
            else if (_.difference(required_path, Object.keys(req.body)).length === 0) {
                if (req.body.hasOwnProperty('token') && required_path.indexOf("token") === 0) {
                    const token = req.body.token;
                    const authenticate = new Global();
                    const tokenCheck = await authenticate.verifyToken(token);
                }
                next();
            } else {
                return res.send(responseFormat(config.enum.response.Error, config.httpcode.BadRequest, null, null, config.message.common_message.InParameters, config.message.common_message.InParameters));
            }


        } catch (err) {
            return res.send(responseFormat(config.enum.response.Error, config.httpcode.Unauthorized, null, config.message.common_message.InvalidToken, config.message.common_message.InvalidToken));
        }
        next()
    }

    verifyToken(token) {

        return new Promise(async (resolve, reject) => {
            try {
                let decoded = await jwt.verify(token, config.enum.cipherSalt);
                if (!decoded) {
                    return resolve(false);
                } else {
                    return resolve(true);
                }
            } catch (err) {
                return reject(false);
            }

        })

    }

    decodeToken(token) {
        return new Promise(async (resolve, reject) => {
            try {
                let decoded = await jwt.decode(token);
                return resolve(decoded)
            } catch (err) {
                return reject(false);
            }
        });
    }

}


module.exports = Global;