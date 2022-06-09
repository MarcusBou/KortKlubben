"use strict";
exports.__esModule = true;
exports.WebSocketServer = void 0;
var ws = require("websocket");
var WSUser_1 = require("./WSUser");
var WebSocketServer = /** @class */ (function () {
    function WebSocketServer(server) {
        var _this = this;
        this.activeRooms = new Array();
        this.sessions = new Array();
        this.listeners = new Array();
        // this.server = http.createServer(function (request, response) {
        //     console.log((new Date()) + ': Recieved request for ' + request.url);
        //     response.writeHead(404);
        //     response.end();
        // });
        this.server = server;
        // this.server.listen(5000, function()  {
        //     console.log((new Date()) + ': Server port is 5000');
        // });
        this.ws = new ws.server({ httpServer: this.server, autoAcceptConnections: false });
        this.ws.on('request', function (data) {
            var path = _this.getPathArray(data.resourceURL.path);
            if (path.length != 2) {
                data.reject(404, "url isnt set currectly");
            }
            else {
                var roomID_1 = path[0];
                var username_1 = path[1];
                var roomFound_1 = false;
                console.log(roomID_1);
                console.log(username_1);
                _this.activeRooms.forEach(function (room) {
                    if (room == roomID_1 && !roomFound_1) {
                        var session = data.accept();
                        var user_1 = new WSUser_1.WSUser(session, room, username_1);
                        _this.sessions.push(user_1);
                        _this.NotifyOnUserJoined(user_1.getRoomID(), user_1.getUsername());
                        roomFound_1 = true;
                        user_1.getSession().on("message", function (message) {
                            if (message.type === "utf8") {
                                console.log(message.utf8Data);
                                _this.NotifyOnMessage(user_1.getRoomID(), user_1.getUsername(), message.utf8Data);
                            }
                        });
                        user_1.getSession().on('close', function () {
                            for (var i = 0; i < _this.sessions.length; i++) {
                                if (_this.sessions[i] == user_1) {
                                    _this.sessions.splice(i, 1);
                                    _this.NnotifyOnUserDisconnect(user_1.getRoomID(), user_1.getUsername());
                                }
                            }
                        });
                    }
                });
                if (!roomFound_1) {
                    data.reject();
                }
            }
        });
    }
    WebSocketServer.prototype.originIsAllow = function (origin) {
        return true;
    };
    WebSocketServer.prototype.getPathArray = function (path) {
        var result = path.split('/');
        if (path[0] == '/') {
            result.splice(0, 1);
        }
        return result;
    };
    WebSocketServer.prototype.addActiveRoom = function (roomid) {
        this.activeRooms.push(roomid);
    };
    WebSocketServer.prototype.removeActiveRoom = function (roomID) {
        for (var i = 0; i < this.activeRooms.length; i++) {
            if (this.activeRooms[i] == roomID) {
                this.activeRooms.splice(i, 1);
            }
        }
    };
    WebSocketServer.prototype.addListener = function (listener) {
        this.listeners.push(listener);
    };
    WebSocketServer.prototype.removeListener = function (listener) {
        for (var i = 0; i < this.listeners.length; i++) {
            if (this.listeners[i] == listener) {
                this.listeners.splice(i, 1);
            }
        }
    };
    WebSocketServer.prototype.NotifyOnMessage = function (roomID, username, message) {
        this.listeners.forEach(function (listener) {
            listener.CommandReceived(roomID, username, message);
        });
    };
    WebSocketServer.prototype.NotifyOnUserJoined = function (roomID, username) {
        this.listeners.forEach(function (listener) {
            listener.onPlayerJoin(roomID, username);
        });
    };
    WebSocketServer.prototype.NnotifyOnUserDisconnect = function (roomID, username) {
        this.listeners.forEach(function (listener) {
            listener.onPlayerDisconnected(roomID, username);
        });
    };
    WebSocketServer.prototype.broadcastRoom = function (roomID, message) {
        this.sessions.forEach(function (session) {
            if (session.getRoomID() == roomID) {
                session.getSession().sendUTF(message);
            }
        });
    };
    WebSocketServer.prototype.broadcastUsername = function (username, message) {
        this.sessions.forEach(function (session) {
            if (session.getUsername() == username) {
                session.getSession().sendUTF(message);
            }
        });
    };
    return WebSocketServer;
}());
exports.WebSocketServer = WebSocketServer;
// let kage = new WebSocketServer();
// kage.addActiveRoom("2002");
