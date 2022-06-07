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
        this.game = new WhistGame();
        this.ws = server;
        this.ws.addListener(this); 
        this.ws.addActiveRoom(id);
    }
    onPlayerJoin(roomID: string, username: string) {
        console.log("Awesome " + username + " joined");
    }
    onPlayerDisconnected(roomID: string, username: string) {
        console.log(username + " disconnected");
    }
    
    CommandReceived(jsonstring: string) {
        let command = JSON.parse(jsonstring);
        this.game.onCommandRecieved(command.Command);
    }

    onResponse(response: string) {
        throw new Error("Method not implemented.");
    }

    public getId(){
        return this.id;
    }

}
