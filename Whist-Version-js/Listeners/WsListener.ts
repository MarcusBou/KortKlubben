export interface WSlistener{
     
    CommandReceived(jsonstring: string);

    onPlayerJoin(roomID: string, username: string);

    onPlayerDisconnected(roomID: string, username: string);
}