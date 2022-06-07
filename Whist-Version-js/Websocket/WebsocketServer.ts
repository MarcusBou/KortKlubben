import * as ws from "websocket";
import * as http from 'http'
import { WSUser } from "./WSUser";
import { WSlistener } from "../Listeners/WsListener";

export class WebSocketServer {
    private server: http.Server;
    private ws: ws.server;
    private activeRooms: Array<string>;
    private sessions: Array<WSUser>;
    private listeners: Array<WSlistener>;

    constructor(server: http.Server) {
        this.activeRooms = new Array<string>();
        this.sessions = new Array<WSUser>();
        this.listeners = new Array<WSlistener>();

        // this.server = http.createServer(function (request, response) {
        //     console.log((new Date()) + ': Recieved request for ' + request.url);
        //     response.writeHead(404);
        //     response.end();
        // });

        this.server = server;

        // this.server.listen(5000, function()  {
        //     console.log((new Date()) + ': Server port is 5000');
        // });

        this.ws = new ws.server({httpServer: this.server, autoAcceptConnections: false});

        this.ws.on('request', (data: ws.request) => {

            let path: Array<string> = this.getPathArray(data.resourceURL.path);
            if (path.length != 2) {
                data.reject(404, "url isnt set currectly");
            }
            else {

                let roomID: string = path[0];
                let username: string = path[1];
                let roomFound: boolean = false;

                console.log(roomID);
                console.log(username);

                this.activeRooms.forEach(room => {
                    if (room == roomID && !roomFound) {
                        let session: ws.connection = data.accept();
                        let user: WSUser = new WSUser(session, room, username);
                        this.sessions.push(user);
                        this.NotifyOnUserJoined(user.getRoomID(), user.getUsername());
                        roomFound = true;
                        user.getSession().on("message", (message: ws.Message) => {
                            if (message.type === "utf8") {
                                this.NotifyOnMessage(message.utf8Data);
                            }
                        });
                        user.getSession().on('close', () => {
                            for (let i = 0; i < this.sessions.length; i++) {
                                if (this.sessions[i] == user) {
                                    this.sessions.splice(i, 1);
                                    this.NnotifyOnUserDisconnect(user.getRoomID(), user.getUsername());
                                }
                            }
                        });
                    }
                });
                if (!roomFound) {
                    data.reject();
                }
            }
        });
    }

    private originIsAllow(origin): boolean {
        return true;
    }

    private getPathArray(path: string) : Array<string> {
        let result = path.split('/');
        if(path[0] == '/') {
            result.splice(0, 1)
        }
        return result;
    }

    public addActiveRoom(roomid: string): void {
        this.activeRooms.push(roomid);
    }

    public removeActiveRoom(roomID: string): void {
        for (let i = 0; i < this.activeRooms.length; i++) {
            if (this.activeRooms[i] == roomID) {
                this.activeRooms.splice(i, 1);
            }
        }
    }

    public addListener(listener: WSlistener) {
        this.listeners.push(listener);
    }
    
    public removeListener(listener: WSlistener) {
        for (let i = 0; i < this.listeners.length; i++) {
            if (this.listeners[i] == listener) {
                this.listeners.splice(i, 1);
            }
        }
    }
    
    private NotifyOnMessage(message: string): void {
        this.listeners.forEach(listener => {
            listener.CommandReceived(message);
        });
    }

    private NotifyOnUserJoined(roomID: string, username: string): void {
        this.listeners.forEach(listener => {
            listener.onPlayerJoin(roomID, username);
        });
    }

    private NnotifyOnUserDisconnect(roomID: string, username: string) {
        this.listeners.forEach(listener => {
            listener.onPlayerDisconnected(roomID, username);
        });
    }

    public broadcastRoom(roomID: string, message: string): void {
        this.sessions.forEach(session => {
            if (session.getRoomID() == roomID) {
                session.getSession().sendUTF(message);
            }
        });
    }

    public broadcastUsername(username: string, message: string) {
        this.sessions.forEach(session => {
            if (session.getUsername() == username) {
                session.getSession().sendUTF(message);
            }
        });
    }
}

// let kage = new WebSocketServer();
// kage.addActiveRoom("2002");