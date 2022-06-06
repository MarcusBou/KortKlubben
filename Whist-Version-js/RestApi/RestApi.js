"use strict";
exports.__esModule = true;
exports.RestApi = void 0;
var express = require("express");
var RestApi = /** @class */ (function () {
    function RestApi(CreateRoomListener, GetListOfRooms) {
        var _this = this;
        this.app = express();
        this.router = express.Router();
        this.port = 3000;
        this.crListener = CreateRoomListener;
        this.glrListener = GetListOfRooms;
        this.app.listen(this.port, function () {
            console.log("Gider et");
        });
        this.router.get("/CreateRoom", function (req, res) {
            res.send(_this.crListener.OnMessage());
        });
        this.router.get("/RoomList", function (req, res) {
            res.send(_this.glrListener.OnRequest());
        });
        this.app.use('/api', this.router);
    }
    return RestApi;
}());
exports.RestApi = RestApi;
