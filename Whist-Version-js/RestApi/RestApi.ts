import { CreateRoomListener, GetListOfRoomsListener } from "../Listeners/RestListener";
import * as express from "express";

export class RestApi{
    private app;
    private port;
    private router;
    private crListener : CreateRoomListener;
    private glrListener : GetListOfRoomsListener;

    constructor(CreateRoomListener: CreateRoomListener, GetListOfRooms: GetListOfRoomsListener){
        this.app = express();
        this.router = express.Router();
        this.port = 3000;

        this.crListener = CreateRoomListener;
        this.glrListener = GetListOfRooms;
        
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
            res.send(this.crListener.OnMessage());
        })

        /**
         * When get request is received gets list from listener
         */
        this.router.get("/RoomList", (req, res)=>{
            res.send(this.glrListener.OnRequest());
        })

        /**
         * Make sure the routes is used
         */
        this.app.use('/api', this.router);
    }

}