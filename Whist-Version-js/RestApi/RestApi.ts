import { CreateRoomListener } from "../Listeners/RestListener";
import * as express from "express";

export class RestApi{
    private app;
    private port;
    private crListener : CreateRoomListener;

    constructor(CreateRoomListener: CreateRoomListener){
        this.app = express();
        this.port = 3000;
        this.crListener = CreateRoomListener

        this.app.listen(this.port, () => {
            console.log("Gider et")
        });
        this.app.get('/CreateRoom', this.weee);  
    }

    weee = (request: Request, response: Response, next: express.NextFunction) =>{
        let we = this.crListener.OnMessage();
        response.status.toString(100)
    }

}