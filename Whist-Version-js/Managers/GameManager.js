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
        this.game = new WhistGame_1.WhistGame();
        this.ws = server;
        this.ws.addListener(this);
        this.ws.addActiveRoom(id);
    }
    GameManager.prototype.CommandReceived = function (jsonstring) {
        this.game.onCommandRecieved(jsonstring);
    };
    GameManager.prototype.onResponse = function (response) {
        throw new Error("Method not implemented.");
    };
    GameManager.prototype.getId = function () {
        return this.id;
    };
    return GameManager;
}());
exports.GameManager = GameManager;
