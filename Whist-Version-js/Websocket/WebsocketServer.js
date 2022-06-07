"use strict";
exports.__esModule = true;
exports.WebSocketServern = void 0;
var ws = require("websocket");
var http_1 = require("http");
var WSUser_1 = require("./WSUser");
var WebSocketServern = /** @class */ (function () {
    function WebSocketServern() {
        var _this = this;
        this.activeRooms = new Array();
        this.sessions = new Array();
        this.server = http_1.createServer(function (request, response) {
            console.log((new Date()) + ': Recieved request for ' + request.url);
            response.writeHead(404);
            response.end();
        });
        this.server.listen(5000, function () {
            console.log((new Date()) + ': Server port is 5000');
        });
        this.ws = new ws.server({ httpServer: this.server, autoAcceptConnections: false });
        this.ws.on('request', function (data) {
            var path = _this.getPathArray(data.resourceURL.path);
            if (path.length != 2) {
                console.log(path);
                data.reject(404, "url isnt set currectly");
            }
            else {
                var roomID_1 = Number.parseInt(path[0]);
                var username_1 = path[1];
                var roomFound_1 = false;
                console.log(roomID_1);
                console.log(username_1);
                _this.activeRooms.forEach(function (room) {
                    if (room == roomID_1 && !roomFound_1) {
                        var session = data.accept();
                        var user = new WSUser_1.WSUser(session, room, username_1);
                        _this.sessions.push(user);
                        roomFound_1 = true;
                    }
                });
                if (!roomFound_1) {
                    data.reject();
                }
            }
        });
        // this.ws.on('connect', (data) => {
        //     let connection = data.accept();
        //     console.log("someone connected");
        //     console.log(data);
        //     connection.on('message', function(data) {
        //         console.log(data);
        //     })
        // })
    }
    WebSocketServern.prototype.originIsAllow = function (origin) {
        return true;
    };
    WebSocketServern.prototype.getPathArray = function (path) {
        var result = path.split('/');
        if (path[0] == '/') {
            result.splice(0, 1);
        }
        return result;
    };
    WebSocketServern.prototype.addActiveRoom = function (roomid) {
        this.activeRooms.push(roomid);
    };
    WebSocketServern.prototype.removeActiveRoom = function (roomID) {
        for (var i = 0; i < this.activeRooms.length; i++) {
            this.activeRooms.splice(i, 1);
        }
    };
    return WebSocketServern;
}());
exports.WebSocketServern = WebSocketServern;

let kage = new WebSocketServern();
kage.addActiveRoom(2002);
// var WebSocketServer = require('websocket').server;
// //var http = require('http');
// var connections = [];
// // var server = new http.createServer(function (request, response) {
// //     console.log((new Date()) + ': Recieved request for ' + request.url);
// //     response.writeHead(404);
// //     response.end();
// // });
// server.listen(5000, function() {
//     console.log((new Date()) + ': Server port is 5000');
// });
// var wsServer = new WebSocketServer({
//     httpServer: server,
//     autoAcceptConnections: false,
// });
// function originIsAllowed(origin) {
//     console.log(origin)
//     // put logic here to detect whether the specified origin is allowed.
//     return true;
// }
// wsServer.on('open', function(data) {
//     console.log("server open");
// })
// wsServer.on('request', function(request) {
//     if (!originIsAllowed(request.origin)) {
//         // Make sure we only accept requests from an allowed origin
//         request.reject();
//         console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
//         return;
//     }
//     var connection = request.accept();
//     connections.push(connection);
//     console.log(connections);
//     connection.on('message', function(message) {
//         if (message.type === 'utf8') {
//             console.log('Message Received: ' + message.utf8Data)
//             connections.forEach(con => {
//                 con.sendUTF('Server Received: '+message.utf8Data);
//             });
//         } else if (message.binaryData) {
//             console.log('Message Received: ' + message.binaryData);
//             connection.sendBytes(message.binaryData);
//         }
//     });
//     connection.on('close', function(reasonCode, description) {
//         for( var i = 0; i < connections.length; i++){ 
//             if ( connections[i] === connection) { 
//                 connections.splice(i, 1); 
//             }
//         }
//         console.log(connections);
//         console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
//     });
// });
// wsServer.on('connection', function(requset) {
//     var connection = request.accept();
//     console.log("someone connected");
//     console.log(requset);
//     connection.on('message', function(data) {
//         console.log(data);
//     })
// });
