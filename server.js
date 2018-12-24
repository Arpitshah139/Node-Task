/**********
 Main File
 **********/

/********************
 Evironment Variables
 *********************/

process.env.MONGODB_CONNECTION_STRING = "mongodb://localhost:27017/task";


// Main Modules

let exp = require('express');
let config = require('./configs/configs');
const express = require('./configs/express');
let mongosse = require('./configs/mongoose');
let path = require('path');
const http = require('http');
const socket_io = require('socket.io');
const io = socket_io({});

// Define Global Variables
global.appRoot = path.resolve(__dirname);


// Declare Modules
db = mongosse();
app = express();

app.use('/', exp.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Listing Server
// app.listen(config.serverPort,()=>{
//    console.log(`Server Running at :${config.apiUrl}`);
// });


let clients = [];

// Server creation starts here

io.attach(http.createServer(app).listen(process.env.PORT || 3000));


// Socket implementation
io.on('connection', function (socket) {
    clients.push(socket);
    socket.on('action', function (action) {
        socket.emit('Receive Code', {'data': 'You Got Response'});
        if (action.type === '/server/hello') {
            socket.emit('action', {type: 'message', data: 'good day!'});
        }
    });


    socket.on('Disconnect', function (data) {
        const index = clients.indexOf(socket);
        if (index !== -1) {
            clients.splice(index, 1);
        }
        socket.disconnect();
    });

});







