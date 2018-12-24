const mongoose = require('mongoose');
const schema = mongoose.Schema;
const client = new schema({
    cid: {type: Number, index: true},
    ulogin: {type: String, index: true},
    upass: {type: String, index: true},
    subdomain: {type: String, index: true},
    ltype: String,
    regtime: Date,
    uemail: {type: String, index: true},
    umobile: {type: Number, index: true},
    accst: Boolean,
    comnm: String,
    name: String,
    menu: String,
    cipher: String,
    isUsed: Number,
    vm: Number,
    qu: Number,
    sactive: Boolean,
    aactive: Boolean,
    isused: Number
}, {
    collection: "clients",
    bufferCommands: true,
    versionKey: false
});
const clientModel = mongoose.model('client', client);
module.exports = {
    clientModel: clientModel
};
