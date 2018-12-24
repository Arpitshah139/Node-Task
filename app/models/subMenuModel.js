const mongoose = require('mongoose');
const schema = mongoose.Schema;
const submenu = new schema({
    name: String,
    submenu: [{
        name: String,
        link: String
    }],
    isLink: Number
}, {
    collection: "submenu",
    bufferCommands: true,
    versionKey: false
});
module.exports = {
    submenu: mongoose.model("submenuModel", submenu)
};
