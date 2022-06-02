"use strict";
exports.__esModule = true;
exports.ServerManager = void 0;
var GameManager_1 = require("./GameManager");
var ServerManager = /** @class */ (function () {
    function ServerManager() {
        this.activeRooms = [];
    }
    ServerManager.prototype.AddRoom = function (id) {
        this.activeRooms.push(new GameManager_1.GameManager(id));
    };
    ServerManager.prototype.GetListOfRooms = function () {
        return this.activeRooms;
    };
    return ServerManager;
}());
exports.ServerManager = ServerManager;
var room = new ServerManager();
room.AddRoom(12);
var rooms = room.GetListOfRooms();
console.log(rooms.toString());
