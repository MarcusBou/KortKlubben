import { IGameEngine } from "../Engine/IGameEngine";
import { WhistGame } from "../Games/WhistGame";
export class GameManager{
    private id: string;
    private game: IGameEngine;
    constructor(id){
        this.id = id;
        this.game = new WhistGame();
    }

    public getId(){
        return this.id;
    }
}
