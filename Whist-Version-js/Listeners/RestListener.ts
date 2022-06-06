import { GameManager } from "../Managers/GameManager";

export interface CreateRoomListener{
    OnCreateRoomMessage(): String;
}
export interface GetListOfRoomsListener{
    OnRoomListRequest(): String;
}