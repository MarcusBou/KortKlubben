export interface WSlistener{

    CommandReceived(roomID:string, jsonstring: string);

    onPlayerJoin(roomID: string, username: string);

    onPlayerDisconnected(roomID: string, username: string);
}