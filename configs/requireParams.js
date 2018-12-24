const config = require('./../configs/configs');

module.exports = function paramList(path) {

    let returnpath = [];
    if (path === '/getplans') {
        returnpath = []
    // }
    } else if (path === '/validatetoken') {
        returnpath = config.api.parameters.validatetoken;
    } else if (path === '/validatelogin') {
        returnpath = config.api.parameters.validatelogin;
    } else if (path === '/validateemail') {
        returnpath = config.api.parameters.validateemail;
    } else if (path === '/validatemobile') {
        returnpath = config.api.parameters.validatemobile;
    } else if (path === '/createuser') {
        returnpath = config.api.parameters.createUser;
    } else if (path === '/getuserdetails') {
        returnpath = config.api.parameters.getuserdetails;
    } else if (path === '/getcompprofiledata') {
        returnpath = config.api.parameters.getcompprofiledata;
    } else if (path === '/validateuser') {
        returnpath = config.api.parameters.validateusername;
    } else if (path === '/changepassword') {
        returnpath = config.api.parameters.changepassword;
    } else if (path === '/menu') {
        returnpath = config.api.parameters.menu;
    } else if (path === '/channelconnector') {
        returnpath = config.api.parameters.channelconnector;
    } else if (path === '/channeloperations') {
        returnpath = config.api.parameters.channeloperations;
    } else if (path === '/addaccount') {
    } else if (path === '/forgotpassword') {
        returnpath = config.api.parameters.forgotpassword;
    }
        return returnpath;
};