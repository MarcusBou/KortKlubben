import { GameManager } from "./GameManager";
import { CreateRoomListener, GetListOfRoomsListener } from "../Listeners/RestListener";
import { RestApi } from "../RestApi/RestApi";
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
    private activeRooms : GameManager[];
    private CreateRoom : RestApi;

    constructor() {
        this.CreateRoom = new RestApi(this, this);
    }
    
    /**
     * Creates room with
     * @param id For logging later
     */
    AddRoom(id) {
        this.activeRooms.push(new GameManager(id));    
    }
    
    /**
     * Gets list of rooms
     * @returns list of the active rooms
     */
    GetListOfRooms(): GameManager[]{
        return this.activeRooms;
    }

    OnMessage(): String {
        return "yip";
    }

    OnRequest(): String{
        
        return "wee";
    }


}

const room = new ServerManager();

