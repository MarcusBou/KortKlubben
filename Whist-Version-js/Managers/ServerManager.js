"use strict";
exports.__esModule = true;
var GameManager_1 = require("./GameManager");
var RestApi_1 = require("../RestApi/RestApi");
/**
 *
 * Class for servermanager
 *
 * This class uses specifies for creating and controlling which gamemanagers and games shall be made
 *
 * @version 1.0
 * @author Marcus
 */
var ServerManager = /** @class */ (function () {
    function ServerManager() {
        this.CreateRoom = new RestApi_1.RestApi(this, this);
        this.activeRooms = new Array();
        this.ActiveIds = new Array();
    }
    /**
     * Creates room with
     * @param id For logging later
     */
    ServerManager.prototype.AddRoom = function (id) {
        this.activeRooms.push(new GameManager_1.GameManager(id));
    };
    /**
     * Gets list of rooms
     * @returns list of the active rooms
     */
    ServerManager.prototype.GetListOfRooms = function () {
        return this.activeRooms;
    };
    /**
     * method run when called in api
     * @returns Id For room just created
     */
    ServerManager.prototype.OnCreateRoomMessage = function () {
        var id = this.CreateRandom();
        var created = true;
        while (created) {
            if (this.CheckID(id)) {
                this.AddRoom(id);
                this.ActiveIds.push(id);
                created = false;
            }
            else {
                id = this.CreateRandom();
            }
        }
        return id;
    };
    /**
     * method run when called in api
     * @returns JSON String with all the active Rooms
     */
    ServerManager.prototype.OnRoomListRequest = function () {
        var roomlist = JSON.stringify(this.activeRooms);
        return roomlist;
    };
    /**
     * Returns an id such as 0984
     */
    ServerManager.prototype.CreateRandom = function () {
        var random = Math.floor(Math.random() * 1000);
        var id = String(random).padStart(4, '0');
        return id;
    };
    /**
     * Checks if id is valid and not taken by another room
     * @param id that needs checking
     */
    ServerManager.prototype.CheckID = function (id) {
        var valid = true;
        if (this.ActiveIds.includes(id)) {
            valid = false;
        }
        return valid;
    };
    return ServerManager;
}());
var room = new ServerManager();
