import { CreateRoomListener, GetListOfRoomsListener } from "../Listeners/RestListener";
import * as express from "express";
/**
 * Class for restApi
 * 
 * This class purpose is communicating with the client. 
 * while client isnt in game
 * 
 * @version 1.0
 * @author Marcus
 */
export class RestApi{
    private app;
    private port;
    private router;
    
    private crListener : CreateRoomListener;
    private glrListener : GetListOfRoomsListener;

    /**
     * On new RestApi it will need the listeners for the usage of communicating with serverManager
     * @param CreateRoomListener When message for createRoom is input
     * @param GetListOfRooms When Request for list is received
     */
    constructor(CreateRoomListener: CreateRoomListener, GetListOfRooms: GetListOfRoomsListener){
        this.app = express();
        this.router = express.Router();
        this.port = 3000;
        this.crListener = CreateRoomListener;
        this.glrListener = GetListOfRooms;
        this.activateApi();
    }

    /**
     * Activates API with CreateRoom, RoomList and activating the route on the api
     */
    private activateApi(){
         /**
         * Sets application up to listen
         */
          this.app.listen(this.port, () => {
            console.log("{Api} Started Correctly")
        });

        /**
         * When get request is received it sends message to listener
         */
        this.router.get("/CreateRoom", (req, res)=>{
            res.send(this.crListener.OnCreateRoomMessage());
        })

        /**
         * When get request is received gets list from listener
         */
        this.router.get("/RoomList", (req, res)=>{
            res.send(this.glrListener.OnRoomListRequest());
        })

        /**
         * Make sure the routes is used
         */
         this.app.use('/api', this.router);
    }

}