"use strict";
exports.__esModule = true;
exports.WebSocketServer = void 0;
var ws = require("websocket");
var WSUser_1 = require("./WSUser");
/**
 * class for WebsocketServer
 *
 * this class
 *
 * @version 1.0
 * @author Sebastian Karlsen
 */
var WebSocketServer = /** @class */ (function () {
    /**
     * Constructor of WebsocketServer.
     * @param server Http server to running on.
     */
    function WebSocketServer(server) {
        var _this = this;
        this.activeRooms = new Array();
        this.sessions = new Array();
        this.listeners = new Array();
        this.server = server;
        this.ws = new ws.server({ httpServer: this.server, autoAcceptConnections: false });
        /**
         * Then Websocket gets a request from a client, it runs through here
         */
        this.ws.on('request', function (data) {
            //get url parameters from client
            var path = _this.getPathArray(data.resourceURL.path);
            //if path is longer then 2 it wont work.
            if (path.length != 2) {
                data.reject(404, "url isnt set currectly");
            }
            else {
                //gets the path id
                var roomID_1 = path[0];
                var username_1 = path[1];
                var roomFound_1 = false;
                /**
                 * if clients room id is valid, it will make connection to user
                 */
                _this.activeRooms.forEach(function (room) {
                    if (room == roomID_1 && !roomFound_1) {
                        //establish client to server;
                        var session = data.accept();
                        var user_1 = new WSUser_1.WSUser(session, room, username_1);
                        _this.sessions.push(user_1);
                        //Notify all the observer that a player has joined.
                        _this.NotifyOnUserJoined(user_1.getRoomID(), user_1.getUsername());
                        roomFound_1 = true;
                        /**
                         * then Websocket get a message from client, it notify the obervers the message
                         */
                        user_1.getSession().on("message", function (message) {
                            if (message.type === "utf8") {
                                console.log(message.utf8Data);
                                _this.NotifyOnMessage(user_1.getRoomID(), user_1.getUsername(), message.utf8Data);
                            }
                        });
                        /**
                         * then websocket get a client disconnecting, its remove client from it and notify to the observes.
                         */
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
                //if active room not found reject user
                if (!roomFound_1) {
                    data.reject();
                }
            }
        });
    }
    /**
     * take the url parameters and splits it to an array
     * @param path url paramenter
     * @returns list of split path in string
     */
    WebSocketServer.prototype.getPathArray = function (path) {
        var result = path.split('/');
        if (path[0] == '/') {
            result.splice(0, 1);
        }
        return result;
    };
    /**
     * Adds a active room to ActiveRoom Array.
     * @param roomid id to be added
     */
    WebSocketServer.prototype.addActiveRoom = function (roomid) {
        this.activeRooms.push(roomid);
    };
    /**
     * Removes a active room from ActiveRoom Array.
     * @param roomID id to remove from array
     */
    WebSocketServer.prototype.removeActiveRoom = function (roomID) {
        for (var i = 0; i < this.activeRooms.length; i++) {
            if (this.activeRooms[i] == roomID) {
                this.activeRooms.splice(i, 1);
            }
        }
    };
    /**
     * adds a listener to list
     * @param listener to be added
     */
    WebSocketServer.prototype.addListener = function (listener) {
        this.listeners.push(listener);
    };
    /**
     * removes a listener from list
     * @param listener to be removed
     */
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
