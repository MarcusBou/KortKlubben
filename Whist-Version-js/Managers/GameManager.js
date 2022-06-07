"use strict";
exports.__esModule = true;
exports.GameManager = void 0;
var WhistGame_1 = require("../Games/WhistGame");
var GameManager = /** @class */ (function () {
    function GameManager(id) {
        this.id = id;
        this.game = new WhistGame_1.WhistGame();
        this.game.onCommandRecieved("wee");
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
