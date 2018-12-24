const Controller = require('./Controller');

const modelService = require('./../services/modelService');
const DbHelper = require('./../services/DbHelper');
const responseFormat = require('./../../configs/response');
const config = require('./../../configs/configs');
const Global = require('./../services/Global');
const Common = require('../services/commonHelper');


class DashboardController extends Controller {
    constructor() {
        super();
    }

 async GetData(){
        let _this = this;
        try {
            let clientid = _this.req.body.cid;
            const clientData = await (new DbHelper(modelService.clientModel)).find_query({'cid': clientid}, {});
            if (clientData.length > 0){
                return _this.res.send(responseFormat(config.enum.response.Success, config.httpcode.OK,clientData, true, null));
            }
        }catch (err) {
            return _this.res.send(responseFormat(config.enum.response.Error, err.code, null, err.message, config.message.common_message.InternalError, config.message.common_message.InternalError, null));

        }

 }

}


module.exports = DashboardController;