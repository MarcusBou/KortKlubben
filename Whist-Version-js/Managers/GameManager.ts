import { IGameEngine } from "../Engine/IGameEngine";
import { IGameListener } from "../Engine/IGameListener";
import { WhistGame } from "../Games/WhistGame";
import { WSlistener } from "../Listeners/WsListener";
import { WebSocketServern } from "../Websocket/WebsocketServer";
/**
 * Class for controlling the communication between the game and clients
 */
export class GameManager implements WSlistener, IGameListener{
    private id: string;
    private game: IGameEngine;
    private ws : WebSocketServern;

    constructor(id){
        this.id = id;
        this.game = new WhistGame();
        this.ws = new WebSocketServern();
    }
    
    CommandReceived(jsonstring: string) {
        this.game.onCommandRecieved(jsonstring);
    }

    onResponse(response: string) {
        throw new Error("Method not implemented.");
    }

    public getId(){
        return this.id;
    }

}
