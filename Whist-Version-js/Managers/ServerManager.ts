import { GameManager } from "./GameManager";
import { CreateRoomListener, GetListOfRoomsListener } from "../Listeners/RestListener";
import { RestApi } from "../RestApi/RestApi";



class ServerManager implements CreateRoomListener, GetListOfRoomsListener{
    
    /** 
     * Array over Active Rooms;
    */
    private activeRooms : GameManager[];
    private CreateRoom : RestApi;

    constructor() {
        this.CreateRoom = new RestApi(this);
    }
    
    /**
     * Creates room with
     * @param id For logging later
     */
    /*AddRoom(id) {
        //this.activeRooms.push(new GameManager(id));    
    }*/
    
    /**
     * Gets list of rooms
     * @returns list of the active rooms
     */
    GetListOfRooms(): GameManager[]{
        return this.activeRooms;
    }

    OnMessage(): String {
        console.log("Method not implemented.");
        return "yip";
    }

    OnRequest(): GameManager[]{
        return this.GetListOfRooms();
    }


}

const room = new ServerManager();
//room.AddRoom(12);
//const rooms = room.OnRequest();

//console.log(rooms);
