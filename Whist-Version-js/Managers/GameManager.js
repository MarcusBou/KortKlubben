"use strict";
exports.__esModule = true;
exports.GameManager = void 0;
var WhistGame_1 = require("../Games/WhistGame");
/**
 * Class for controlling the communication between the game and clients
 */
var GameManager = /** @class */ (function () {
    function GameManager(id, server) {
        this.id = id;
        this.game = new WhistGame_1.WhistGame(this);
        this.ws = server;
        this.ws.addListener(this);
        this.ws.addActiveRoom(id);
    }
    GameManager.prototype.onPlayerJoin = function (roomID, username) {
        this.game.addPlayer(username);
        console.log("Awesome " + username + " joined");
    };
    GameManager.prototype.onPlayerDisconnected = function (roomID, username) {
        console.log(username + " disconnected");
    };
    GameManager.prototype.CommandReceived = function (jsonstring) {
        try {
            var command = JSON.parse(jsonstring);
            this.game.onCommandRecieved(command);
        }
        catch (e) {
            this.ws.broadcastRoom(this.id, "Not a valid json input");
        }
    };
    GameManager.prototype.onResponse = function (response) {
        this.ws.broadcastRoom(this.id, response);
    };
    GameManager.prototype.getId = function () {
        return this.id;
    };
    return GameManager;
}());
exports.GameManager = GameManager;
