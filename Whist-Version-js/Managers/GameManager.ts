import { IGameEngine } from "../Engine/IGameEngine";
import { IGameListener } from "../Engine/IGameListener";
import { WhistGame } from "../Games/WhistGame";
import { WSlistener } from "../Listeners/WsListener";
export class GameManager implements WSlistener, IGameListener{
    private id: string;
    private game: IGameEngine;

    constructor(id){
        this.id = id;
        this.game = new WhistGame();
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
