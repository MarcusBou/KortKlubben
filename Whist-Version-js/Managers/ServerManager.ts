import { GameManager } from "./GameManager";


export class ServerManager{
    
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

console.log(rooms.toString())