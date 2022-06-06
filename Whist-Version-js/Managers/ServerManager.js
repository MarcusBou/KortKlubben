"use strict";
exports.__esModule = true;
var RestApi_1 = require("../RestApi/RestApi");
var ServerManager = /** @class */ (function () {
    function ServerManager() {
        this.CreateRoom = new RestApi_1.RestApi(this, this);
    }
    /**
     * Creates room with
     * @param id For logging later
     */
    /*AddRoom(id) {
        //this.activeRooms.push(new GameManager(id));
    }*/
    /**
     * Gets list of rooms
     * @returns list of the active rooms
     */
    ServerManager.prototype.GetListOfRooms = function () {
        return this.activeRooms;
    };
    ServerManager.prototype.OnMessage = function () {
        console.log("Method not implemented.");
        return "yip";
    };
    ServerManager.prototype.OnRequest = function () {
        return "wee";
    };
    return ServerManager;
}());
var room = new ServerManager();
