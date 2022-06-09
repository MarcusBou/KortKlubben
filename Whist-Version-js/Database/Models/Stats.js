"use strict";
exports.__esModule = true;
exports.Stats = void 0;
var Stats = /** @class */ (function () {
    function Stats(username, wins, lost, gamesPlayed) {
        this.username = username;
        this.wins = wins;
        this.lost = lost;
        this.gamesPlayed = gamesPlayed;
    }
    Stats.prototype.GetUsername = function () {
        return this.username;
    };
    Stats.prototype.GetWins = function () {
        return this.wins;
    };
    Stats.prototype.GetLost = function () {
        return this.lost;
    };
    Stats.prototype.GetGamesPlayed = function () {
        return this.gamesPlayed;
    };
    return Stats;
}());
exports.Stats = Stats;
