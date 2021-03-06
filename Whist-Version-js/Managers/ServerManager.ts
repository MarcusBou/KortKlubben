import { GameManager } from "./GameManager";
import { CreateRoomListener, GetListOfRoomsListener } from "../Listeners/RestListener";
import { RestApi } from "../RestApi/RestApi";
import { json } from "express";
import * as http from 'http';
import { WebSocketServer } from "../Websocket/WebsocketServer";
/**
 * 
 * Class for servermanager
 * 
 * This class uses specifies for creating and controlling which gamemanagers and games shall be made
 * 
 * @version 1.0
 * @author Marcus
 */
class ServerManager implements CreateRoomListener, GetListOfRoomsListener{
    
    /** 
     * Array over Active Rooms;
    */
    private activeRooms : Array<GameManager>;
    private api : RestApi;
    private activeIds: Array<string>;
    private WsHttp: http.Server;
    private WS: WebSocketServer;

    constructor() {
        this.api = new RestApi(this, this);
        this.activeRooms = new Array<GameManager>();
        this.activeIds = new Array<string>();
        this.WsHttp = http.createServer(function (request, response) {
                console.log((new Date()) + ': Recieved request for ' + request.url);
                response.writeHead(404);
                response.end();
        });

        this.WsHttp.listen(5000, function()  {
                console.log((new Date()) + ': Server port is 5000');
        });

        this.WS = new WebSocketServer(this.WsHttp);
    }
    
    /**
     * Creates room with
     * @param id For logging later
     */
    AddRoom(id) {
        this.activeRooms.push(new GameManager(id, this.WS));    
    }
    
    /**
     * Gets list of rooms
     * @returns list of the active rooms
     */
    GetListOfRooms(): GameManager[]{
        return this.activeRooms;
    }

    /**
     * method run when called in api
     * @returns Id For room just created
     */
    OnCreateRoomMessage(): String {
        let id = this.CreateRandom();
        let created = true;
        while(created){
            if(this.CheckID(id)){
                this.AddRoom(id);
                this.activeIds.push(id);
                created = false;
            }
            else{
                id = this.CreateRandom();
            }
        }
        return id;
    }

    /**
     * method run when called in api
     * @returns JSON String with all the active Rooms
     */
    OnRoomListRequest(): String{
        let roomlist = JSON.stringify(this.activeRooms);
        return roomlist;
    }

    /**
     * Returns an id such as 0984
     */
    CreateRandom(){
        let random = Math.floor(Math.random()*1000);
        let id = String(random).padStart(4, '0');
        return id;
    }

    /**
     * Checks if id is valid and not taken by another room
     * @param id that needs checking
     */
    CheckID(id){
        let valid = true;
        if(this.activeIds.includes(id)){
            valid = false;
        }
        return valid;
    }
}

const room = new ServerManager();

