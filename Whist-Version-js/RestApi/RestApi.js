"use strict";
exports.__esModule = true;
exports.RestApi = void 0;
var express = require("express");
var RestApi = /** @class */ (function () {
    function RestApi(CreateRoomListener) {
        var _this = this;
        this.weee = function (request, response, next) {
            var we = _this.crListener.OnMessage();
            response.status.toString(100);
        };
        this.app = express();
        this.port = 3000;
        this.crListener = CreateRoomListener;
        this.app.listen(this.port, function () {
            console.log("Gider et");
        });
        this.app.get('/CreateRoom', this.weee);
    }
    return RestApi;
}());
exports.RestApi = RestApi;
