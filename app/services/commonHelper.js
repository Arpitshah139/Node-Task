const modelservice = require('./../services/modelService');
const DbHelper = require('./../services/DbHelper');
const config = require('./../../configs/configs');
const _ = require('lodash');
const crypto = require("crypto");
const date = require('node-datetime');
const path = require('path');

class Common {

    constructor() {
    }

    static encrypt(key, data) {
        const cipher = crypto.createCipher('aes-256-cbc', key);
        let crypted = cipher.update(data, 'utf-8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    }

    static decrypt(key, data) {
        const decipher = crypto.createDecipher('aes-256-cbc', key);
        let decrypted = decipher.update(data, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    }

    static generate_password(len) {
        const length = len;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$&*";
        let retVal = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        const salt = config.credentials.salt;
        const encryptedKey = Common.encrypt(salt, retVal);
        return {raw: retVal, encrypted: encryptedKey}
    }

    static get_unique_operations(channeldata) {
        let uniqoper = [], cond = [];
        for (let i in channeldata) {
            if (channeldata[i].active === 1) {
                uniqoper.push(channeldata[i].operation);
            }
        }
        uniqoper = _.uniq(uniqoper);
        for (let j in uniqoper) {
            cond.push({"name": uniqoper[j]});
        }
        return cond;
    }

    async get_menu_with_validation(menu, submenu2, expiredOps) {
        return new Promise(async (resolve, reject) => {
            try {
                const expired = Common.get_all_plan_data([expiredOps[0]]);
                const exChannelOperationData = await (new DbHelper(modelservice.channeloperations)).find_distinct('operation', {'_id': {'$in': expired}});
                const notExpired = Common.get_all_plan_data([expiredOps[1]]);
                const notExChannelOperationData = await (new DbHelper(modelservice.channeloperations)).find_distinct('operation', {'_id': {'$in': notExpired}});
                if (menu !== '') {
                    const menus = Common.getmenu(menu, submenu2, _.difference(exChannelOperationData, notExChannelOperationData));
                    resolve(menus);
                } else {
                    resolve([])
                }
            } catch (err) {
                reject(err)
            }
        });
    }

    static getmenu(menu, submenu2, expiredOps) {
        let menuof = [];
        for (let i in menu) {
            let smenu = menu[i].submenu;
            let definemenu = {
                "name": menu[i].name
            };
            let submenu1 = [];
            for (let j in smenu) {

                if (smenu[j].general === 1) {
                    submenu1.push({"name": smenu[j].name, "link": smenu[j].link, "islink": 1});
                }
                let index = _.findIndex(submenu2, {'name': smenu[j].key});
                if (index > -1) {
                    if (smenu[j].key === submenu2[index].name) {
                        let submenu_ = {"submenu": submenu2[index].submenu};
                        if (_.indexOf(expiredOps, smenu[j].key) > -1) {
                            submenu_['isExpired'] = 1;
                        }
                        submenu_['islink'] = 0;
                        submenu_['name'] = smenu[j].name;
                        submenu1 = _.concat(submenu1, submenu_);
                    }
                }
            }
            definemenu['submenu'] = submenu1;
            definemenu['class'] = menu[i].class;
            menuof.push(definemenu);
        }
        return menuof;
    }

}

module.exports = Common;
