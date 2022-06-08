import { trimSingleQuotes } from "tslint/lib/utils";
import { IGameEngine } from "../Engine/IGameEngine";
import { IGameListener } from "../Engine/IGameListener";
import { WhistGame } from "../Games/WhistGame";
import { WSlistener } from "../Listeners/WsListener";
import { WebSocketServer } from "../Websocket/WebsocketServer";
/**
 * Class for controlling the communication between the game and clients
 */
export class GameManager implements WSlistener, IGameListener{
    private id: string;
    private game: IGameEngine;
    private ws : WebSocketServer;

    constructor(id, server: WebSocketServer){
        this.id = id;
        this.game = new WhistGame(this);
        this.ws = server;
        this.ws.addListener(this); 
        this.ws.addActiveRoom(id);
    }
    onPlayerJoin(roomID: string, username: string) {
        this.game.addPlayer(username);
        console.log("Awesome " + username + " joined");
    }
    onPlayerDisconnected(roomID: string, username: string) {
        console.log(username + " disconnected");
    }
    
    CommandReceived(roomID: string, jsonstring: string) {
        this.ws.broadcastRoom(this.id, jsonstring);
        /*if(roomID == this.id){
            try{
                let command = JSON.parse(jsonstring);
                this.game.onCommandRecieved(command);
            }catch(e){
                this.ws.broadcastRoom(this.id, "Not a valid json input");
            }
        }*/
    }

    onResponse(game: string, command: string, information: any) {
        
    }

    public getId(){
        return this.id;
    }
    
    private prepareMessage(game: string, command: string, information: any){
        
    }

}
