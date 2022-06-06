"use strict";
exports.__esModule = true;
exports.RestApi = void 0;
var express = require("express");
/**
 * Class for restApi
 *
 * This class purpose is communicating with the client.
 * while client isnt in game
 *
 * @version 1.0
 * @author Marcus
 */
var RestApi = /** @class */ (function () {
    /**
     * On new RestApi it will need the listeners for the usage of communicating with serverManager
     * @param CreateRoomListener When message for createRoom is input
     * @param GetListOfRooms When Request for list is received
     */
    function RestApi(CreateRoomListener, GetListOfRooms) {
        this.app = express();
        this.router = express.Router();
        this.port = 3000;
        this.crListener = CreateRoomListener;
        this.glrListener = GetListOfRooms;
        this.activateApi();
    }
    /**
     * Activates API with CreateRoom, RoomList and activating the route on the api
     */
    RestApi.prototype.activateApi = function () {
        var _this = this;
        /**
        * Sets application up to listen
        */
        this.app.listen(this.port, function () {
            console.log("{Api} Started Correctly");
        });
        /**
         * When get request is received it sends message to listener
         */
        this.router.get("/CreateRoom", function (req, res) {
            res.status(200).send(_this.crListener.OnCreateRoomMessage());
        });
        /**
         * When get request is received gets list from listener
         */
        this.router.get("/RoomList", function (req, res) {
            res.send(_this.glrListener.OnRoomListRequest());
        });
        /**
         * Make sure the routes is used
         */
        this.app.use('/api', this.router);
    };
    return RestApi;
}());
exports.RestApi = RestApi;
