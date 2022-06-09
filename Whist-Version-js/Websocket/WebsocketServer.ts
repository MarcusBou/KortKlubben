import * as ws from "websocket";
import * as http from 'http';
import { WSUser } from "./WSUser";
import { WSlistener } from "../Listeners/WsListener";

/**
 * class for WebsocketServer
 * 
 * this class 
 * 
 * @version 1.0
 * @author Sebastian Karlsen
 */
export class WebSocketServer {
    private server: http.Server;
    private ws: ws.server;
    /**
     * list of all the active room ideas.
     */
    private activeRooms: Array<string>;
    /**
     * list of all the users who is connected.
     */
    private sessions: Array<WSUser>;
    /**
     * list of all the listeners that is bind to this class
     */
    private listeners: Array<WSlistener>;

    /**
     * Constructor of WebsocketServer.
     * @param server Http server to running on.
     */
    constructor(server: http.Server) {
        this.activeRooms = new Array<string>();
        this.sessions = new Array<WSUser>();
        this.listeners = new Array<WSlistener>();
        this.server = server;

        this.ws = new ws.server({httpServer: this.server, autoAcceptConnections: false});

        /**
         * Then Websocket gets a request from a client, it runs through here 
         */
        this.ws.on('request', (data: ws.request) => {

            //get url parameters from client
            let path: Array<string> = this.getPathArray(data.resourceURL.path);
            //if path is longer then 2 it wont work.
            if (path.length != 2) {
                data.reject(404, "url isnt set currectly");
            }
            else {
                //gets the path id
                let roomID: string = path[0];
                let username: string = path[1];
                let roomFound: boolean = false;

                /**
                 * if clients room id is valid, it will make connection to user
                 */
                this.activeRooms.forEach(room => {
                    if (room == roomID && !roomFound) {
                        //establish client to server;
                        let session: ws.connection = data.accept();
                        let user: WSUser = new WSUser(session, room, username);
                        this.sessions.push(user);
                        //Notify all the observer that a player has joined.
                        this.NotifyOnUserJoined(user.getRoomID(), user.getUsername());
                        roomFound = true;

                        /**
                         * then Websocket get a message from client, it notify the obervers the message
                         */
                        user.getSession().on("message", (message: ws.Message) => {
                            if (message.type === "utf8") {
                                console.log(message.utf8Data);
                                this.NotifyOnMessage(user.getRoomID(), user.getUsername(), message.utf8Data);
                            }
                        });

                        /**
                         * then websocket get a client disconnecting, its remove client from it and notify to the observes.
                         */
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
                //if active room not found reject user
                if (!roomFound) {
                    data.reject();
                }
            }
        });
    }

    /**
     * take the url parameters and splits it to an array
     * @param path url paramenter
     * @returns list of split path in string
     */
    private getPathArray(path: string) : Array<string> {
        let result = path.split('/');
        if(path[0] == '/') {
            result.splice(0, 1)
        }
        return result;
    }

    /**
     * Adds a active room to ActiveRoom Array.
     * @param roomid id to be added
     */
    public addActiveRoom(roomid: string): void {
        this.activeRooms.push(roomid);
    }

    /**
     * Removes a active room from ActiveRoom Array.
     * @param roomID id to remove from array
     */
    public removeActiveRoom(roomID: string): void {
        for (let i = 0; i < this.activeRooms.length; i++) {
            if (this.activeRooms[i] == roomID) {
                this.activeRooms.splice(i, 1);
            }
        }
    }

    /** 
     * adds a listener to list
     * @param listener to be added
     */
    public addListener(listener: WSlistener): void {
        this.listeners.push(listener);
    }
    
    /**
     * removes a listener from list
     * @param listener to be removed
     */
    public removeListener(listener: WSlistener) {
        for (let i = 0; i < this.listeners.length; i++) {
            if (this.listeners[i] == listener) {
                this.listeners.splice(i, 1);
            }
        }
    }
    
    private NotifyOnMessage(roomID: string, username: string, message: string): void {
        this.listeners.forEach(listener => {
            listener.CommandReceived(roomID, username, message);
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