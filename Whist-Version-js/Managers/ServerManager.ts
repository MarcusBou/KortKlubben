import { GameManager } from "./GameManager";
import { RestListener } from "../Listeners/RestListener";



export class ServerManager implements RestListener{
    
    /** 
     * Array over Active Rooms;
    */
    private activeRooms;

    constructor() {
        this.activeRooms = [];
    }

    AddRoom(id) {
        this.activeRooms.push(new GameManager(id));    
    }
    
    GetListOfRooms(){
        return this.activeRooms;
    }


}

const room = new ServerManager();
room.AddRoom(12);
const rooms = room.GetListOfRooms();

console.log(rooms.toString());
