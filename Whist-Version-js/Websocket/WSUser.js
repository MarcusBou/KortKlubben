"use strict";
exports.__esModule = true;
exports.WSUser = void 0;
var WSUser = /** @class */ (function () {
    function WSUser(session, roomID, username) {
        this.session = session;
        this.roomID = roomID;
        this.username = username;
    }
    WSUser.prototype.getSession = function () {
        return this.session;
    };
    WSUser.prototype.getRoomID = function () {
        return this.roomID;
    };
    WSUser.prototype.getUsername = function () {
        return this.username;
    };
    return WSUser;
}());
exports.WSUser = WSUser;
