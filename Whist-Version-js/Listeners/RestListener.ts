import { GameManager } from "../Managers/GameManager";

export interface CreateRoomListener{
    OnMessage(): String;
}
export interface GetListOfRoomsListener{
    OnRequest(): GameManager[];
}