export interface IGameListener {

    onDirectMessageResponse(user: string,game: string, command: string, information: any);
    onBroadcastMessageResponse(game: string, command: string, information: any);
}