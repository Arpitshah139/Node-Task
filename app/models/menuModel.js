const mongoose = require('mongoose');
const schema = mongoose.Schema;
const menu = new schema({
    name: String,
    class: String,
    submenu: [
        {
            general: Number,
            name: String,
            key: String,
            link: String
        }
    ]
}, {
    collection: "menu",
    bufferCommands: true,
    versionKey: false
});
module.exports = {
    menu: mongoose.model("menuModel", menu)
};
