import * as ws from "websocket";

export class WSUser{
    private session: ws.connection;
    private roomID: string;
    private username: string;

    public constructor(session: ws.connection, roomID: string, username: string) {
        this.session = session;
        this.roomID = roomID;
        this.username = username;
    }

    public getSession(): ws.connection {
        return this.session;
    }

    public getRoomID(): string {
        return this.roomID;
    }

    public getUsername(): string {
        return this.username;
    }
}