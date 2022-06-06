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
    private activeRooms : Array<GameManager>;
    private CreateRoom : RestApi;
    private ActiveIds: Array<string>;

    constructor() {
        this.CreateRoom = new RestApi(this, this);
        this.activeRooms = new Array<GameManager>();
        this.ActiveIds = new Array<string>();
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

    OnCreateRoomMessage(): String {
        let id = this.CreateRandom();
        let created = true;
        while(created){
            if(this.CheckID(id)){
                this.AddRoom(id);
            }
            else{
                id = this.CreateRandom();
            }
        }
        return id;
    }

    OnRoomListRequest(): String{
        return "wee";
    }

    /**
     * Returns an id such as 0984
     */
    CreateRandom(){
        let random = Math.floor(Math.random()*1000);
        let id = String(random).padStart(4, '0');
        return id;
    }

    /**
     * Checks if id is valid and not taken by another room
     * @param id that needs checking
     */
    CheckID(id){
        let valid = true;
        console.log(this.ActiveIds);
        if(this.ActiveIds.includes(id)){
            valid = false;
        }
        return valid;
    }
}

const room = new ServerManager();

