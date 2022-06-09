"use strict";
exports.__esModule = true;
exports.User = void 0;
var User = /** @class */ (function () {
    function User(username, name, mail, birthdate) {
        this.username = username;
        this.name = name;
        this.mail = mail;
        this.birthdate = birthdate;
    }
    User.prototype.GetUsername = function () {
        return this.username;
    };
    User.prototype.GetName = function () {
        return this.name;
    };
    User.prototype.GetMail = function () {
        return this.mail;
    };
    User.prototype.GetBirthdate = function () {
        return this.birthdate;
    };
    User.prototype.toString = function () {
        return "User{" +
            "username='" + this.username + '\'' +
            ", name='" + this.name + '\'' +
            ", mail='" + this.mail + '\'' +
            ", birthdate=" + this.birthdate +
            '}';
    };
    return User;
}());
exports.User = User;
