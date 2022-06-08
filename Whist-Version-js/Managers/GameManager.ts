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
    
    CommandReceived(roomID: string, username: string,jsonstring: string) {
        if(roomID == this.id){
            try{
                let command = JSON.parse(jsonstring);
                this.game.onCommandRecieved(username,command);
            }catch(e){
                console.log(e);
                this.ws.broadcastRoom(this.id, "Not a valid json input");
            }
        }
    }

    onDirectMessageResponse(user: string,game: string, command: string, information: any) {
        let message = this.prepareMessage(game, command, information);
        this.ws.broadcastUsername(user, message)
    }
    onBroadcastMessageResponse(game: string, command: string, information: any) {
        let message = this.prepareMessage(game, command, information);
        this.ws.broadcastRoom(this.id, message);
    }

    public getId(){
        return this.id;
    }
    
    private prepareMessage(game: string, command: string, information: any){
        return "{\"game\":\""+ game +"\", \"command\" : \"" + command + "\", \"info\":"+ information+"}"
    }

}
