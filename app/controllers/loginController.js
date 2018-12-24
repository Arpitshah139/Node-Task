const Controller = require('./Controller');
const modelService = require('./../services/modelService');
const DbHelper = require('./../services/DbHelper');
const responseFormat = require('./../../configs/response');
const config = require('./../../configs/configs');
const Common = require('../services/commonHelper');
const Global = require('./../services/Global');

class LoginController extends Controller {
    constructor() {
        super();
    }

    async hi(){
        let _this = this;
        try {

            return _this.res.send(responseFormat(config.enum.response.Success, config.httpcode.OK, null, null));
        }catch (er) {
            console.log(er);
            return _this.res.send(responseFormat(config.enum.response.Error, err.code, null, err.message, config.message.common_message.InternalError, config.message.common_message.InternalError, null));

        }
    };

    async ValidateLogin() {
        let _this = this;
        try {
            const uname = _this.req.body.username;
            const pwd = _this.req.body.password;
            const subdom = _this.req.body.subdomain;
            let clientData = await (new DbHelper(modelService.clientModel)).find_query({
                'ulogin': uname,
            }, {});
            if (clientData.length > 0) {
                clientData = clientData[0];
                const decryptpassword = Common.decrypt(config.enum.salt, clientData.upass);
                if (decryptpassword === pwd) {
                    if (clientData.ltype === 'admin') {
                        const dataForToken = {
                            "username": clientData.ulogin,
                            "clientid": clientData.cid
                        };
                        const token = await new Global().generateToken(dataForToken, clientData.ltype);
                        return _this.res.send(responseFormat(config.enum.response.Success, config.httpcode.OK, token, null, null));
                    } else {
                        let token_json = {};
                        token_json['username'] = clientData.ulogin;
                        token_json['clientid'] = clientData.cid;
                        let requestData = await (new DbHelper(modelService.requests)).find_query({'_id': clientData.cid}, {});
                        if (requestData.length > 0) {
                            let requestdata = requestData[0];
                            token_json['role'] = clientData.ltype;
                            const dataForToken = {
                                "username": clientData.ulogin,
                                "clientid": clientData.cid
                            };
                            token_json['token'] = await new Global().generateToken(dataForToken, clientData.ulogin);
                            return _this.res.send(responseFormat(config.enum.response.Success, config.httpcode.OK, token_json, null, null));
                        } else {
                            return _this.res.send(responseFormat(config.enum.response.Error, config.httpcode.NoContent, [], null, null, config.message.common_message.NoRequestFound));
                        }
                    }
                } else {
                    return _this.res.send(responseFormat(config.enum.response.Error, config.httpcode.Unauthorized, null, null, config.message.common_message.WrongCredentials))
                }
            } else {
                return _this.res.send(responseFormat(config.enum.response.Error, config.httpcode.NoContent, null, null, null, config.message.common_message.ClientNotExists));
            }
        } catch (err) {
            return _this.res.send(responseFormat(config.enum.response.Error, err.code, null, err.message, config.message.common_message.InternalError, config.message.common_message.InternalError, null));
        }

    }

    async ValidateToken() {
        let _this = this;
        try {
            const token = _this.req.body.token;
            const decodedToken = await new Global().decodeToken(token);
            return _this.res.send(responseFormat(config.enum.response.Success, config.httpcode.OK, decodedToken, null, null));
        } catch (err) {
            return _this.res.send(responseFormat(config.enum.response.Error, err.code, null, err.message, config.message.common_message.InternalError, config.message.common_message.InternalError, null));
        }
    }

    async ValidateEmail() {
        let _this = this;
        try {
            const uemail = _this.req.body.uemail;
            const EmailData = await (new DbHelper(modelService.clientModel)).find_query({'uemail': uemail}, {});
            if (EmailData.length > 0) {
                return _this.res.send(responseFormat(config.enum.response.Success, config.httpcode.OK, true, null));
            } else {
                return _this.res.send(responseFormat(config.enum.response.Success, config.httpcode.OK, false, null));
            }
        } catch (err) {
            return _this.res.send(responseFormat(config.enum.response.Error, err.code, null, err.message, config.message.common_message.InternalError, config.message.common_message.InternalError, null));
        }

    }

    async ValidateMobile() {
        let _this = this;
        try {
            const umobile = _this.req.body.umobile;
            const MobileData = await (new DbHelper(modelService.clientModel)).find_query({'umobile': umobile}, {});
            if (MobileData.length > 0) {
                return _this.res.send(responseFormat(config.enum.response.Success, config.httpcode.OK, true, null));
            } else {
                return _this.res.send(responseFormat(config.enum.response.Success, config.httpcode.OK, false, null));
            }
        } catch (err) {
            return _this.res.send(responseFormat(config.enum.response.Error, err.code, null, err.message, config.message.common_message.InternalError, config.message.common_message.InternalError, null));
        }
    }

    async CreateUser() {
        let _this = this;
        try {
            let newuser = {
                'cid': parseInt(_this.req.body.clientid),
                'ulogin': _this.req.body.username,
                'upass': _this.req.body.password,
                'uemail': _this.req.body.email,
                'menu': _this.req.body.menu
            };

            const clientdata = await (new DbHelper(modelService.clientModel)).find_query({
                'cid': newuser.cid,
                'ltype': 'admin'
            }, {});
            if (clientdata.length > 0) {
                return _this.res.send(responseFormat(config.enum.response.Error, config.httpcode.OK, clientdata, null, config.message.common_message.UserAlreadyExists));
            } else {
                newuser.ltype = _this.req.body.ltype || 'user';
                newuser.subdomain = response[0].subdomain;
                newuser.comnm = response[0].comnm;
                newuser.umobile = parseInt(_this.req.body.umobile) || response[0].umobile;
                newuser.regtime = new Date();
                const newuserData = await (new DbHelper(modelService.clientModel)).update({
                    'ulogin': newuser.ulogin,
                    'cid': newuser.cid
                }, {'$set': newuser});
                return _this.res.send(responseFormat(config.enum.response.Success, config.httpcode.OK, newuserData, null, config.message.common_message.UserCreated));
            }
        } catch (err) {
            return _this.res.send(responseFormat(config.enum.response.Error, err.code, null, err.message, config.message.common_message.InternalError, config.message.common_message.InternalError, null));
        }
    }

    async GetUserDetails() {
        let _this = this;
        try {
            const clientId = _this.req.body.clientid;
            const username = _this.req.body.username;
            const clientData = await (new DbHelper(modelService.clientModel)).find_query({
                'cid': clientId,
                'ulogin': username
            }, {});
            return _this.res.send(responseFormat(config.enum.response.Success, config.httpcode.OK, clientData, null));
        } catch (err) {
            return _this.res.send(responseFormat(config.enum.response.Error, err.code, null, err.message, config.message.common_message.InternalError, config.message.common_message.InternalError, null));
        }
    }

    async GetCompanyProfileData() {
        let _this = this;
        try {
            const clientId = parseInt(_this.req.body.cid);
            const profileData = await (new DbHelper(modelService.comprofile)).find_query({'cid': clientId}, {});
            return _this.res.send(responseFormat(config.enum.response.Success, config.httpcode.OK, profileData, null));
        } catch (err) {
            return _this.res.send(responseFormat(config.enum.response.Error, err.code, null, err.message, config.message.common_message.InternalError, config.message.common_message.InternalError, null));
        }
    }

    async ValidateUser() {
        let _this = this;
        try {
            const uemail = _this.req.body.ulogin;
            const subdomain = _this.req.body.subdomain;
            const userData = await (new DbHelper(modelService.clientModel)).find_query({
                'ulogin': uemail,
                'subdomain': subdomain
            }, {});
            if (userData.length > 0) {
                return _this.res.send(responseFormat(config.enum.response.Success, config.httpcode.OK, true, null));
            } else {
                return _this.res.send(responseFormat(config.enum.response.Success, config.httpcode.OK, true, null));
            }
        } catch (err) {
            return _this.res.send(responseFormat(config.enum.response.Error, err.code, null, err.message, config.message.common_message.InternalError, config.message.common_message.InternalError, null));
        }
    }

    async ChangePassword() {
        let _this = this;
        try {
            const token = _this.req.body.token;
            const decodedToken = await new Global().decodeToken(token);
            const currentpassword = _this.req.body.current;
            const newpassword = _this.req.body.password;
            const ulogin = _this.req.body.ulogin;
            const clientId = parseInt(decodedToken.data.clientid);
            const clientData = await (new DbHelper(modelService.clientModel)).find_query({
                'cid': clientId,
                'ulogin': ulogin
            }, {});
            const currpassword = clientData[0]['upass'];
            const decodedpassword = Common.decrypt(config.enum.salt, currpassword);
            if (currentpassword === decodedpassword) {
                const newencrypt = Common.encrypt(config.enum.salt, newpassword);
                await (new DbHelper(modelService.clientModel)).update({
                    'cid': clientId,
                    'ulogin': ulogin
                }, {'$set': {'upass': newencrypt}}, false, false);
                return _this.res.send(responseFormat(config.enum.response.Success, config.httpcode.OK, true, null, config.message.common_message.PasswordUpdateSuccess, config.message.common_message.PasswordUpdateSuccess));

            } else {
                return _this.res.send(responseFormat(config.enum.response.Error, config.httpcode.BadRequest, null, err, 'Current password is wrong', config.message.common_message.PasswordMismatch))
            }
        }
        catch (err) {
            return _this.res.send(responseFormat(config.enum.response.Error, err.code, null, err.message, config.message.common_message.InternalError, config.message.common_message.InternalError, null));
        }
    }

}


module.exports = LoginController;