import * as ws from "websocket";
import http from 'http'
import { WSUser } from "./WSUser";

export class WebSocketServern {
    private server: http.Server;
    private ws: ws.server;
    private activeRooms: Array<string>;
    private sessions: Array<WSUser>;

    constructor() {
        this.activeRooms = new Array<string>();
        this.sessions = new Array<WSUser>();

        this.server = http.createServer(function (request, response) {
            console.log((new Date()) + ': Recieved request for ' + request.url);
            response.writeHead(404);
            response.end();
        });

        this.server.listen(5000, function()  {
            console.log((new Date()) + ': Server port is 5000');
        });

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
                        roomFound = true;
                    }
                });
                
                if (!roomFound) {
                    data.reject();
                }
            }
        });
        // this.ws.on('connect', (data) => {
        //     let connection = data.accept();
        //     console.log("someone connected");
        //     console.log(data);
        //     connection.on('message', function(data) {
        //         console.log(data);
        //     })
        // })
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
            this.activeRooms.splice(i, 1);
        }
    }
}

// var WebSocketServer = require('websocket').server;
// //var http = require('http');
// var connections = [];

// // var server = new http.createServer(function (request, response) {
// //     console.log((new Date()) + ': Recieved request for ' + request.url);
// //     response.writeHead(404);
// //     response.end();
// // });

// server.listen(5000, function() {
//     console.log((new Date()) + ': Server port is 5000');
// });

// var wsServer = new WebSocketServer({
//     httpServer: server,
//     autoAcceptConnections: false,
// });

// function originIsAllowed(origin) {
//     console.log(origin)
//     // put logic here to detect whether the specified origin is allowed.
//     return true;
// }

// wsServer.on('open', function(data) {
//     console.log("server open");
// })

// wsServer.on('request', function(request) {
//     if (!originIsAllowed(request.origin)) {
//         // Make sure we only accept requests from an allowed origin
//         request.reject();
//         console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
//         return;
//     }

//     var connection = request.accept();
//     connections.push(connection);
//     console.log(connections);
//     connection.on('message', function(message) {
//         if (message.type === 'utf8') {
//             console.log('Message Received: ' + message.utf8Data)
//             connections.forEach(con => {
//                 con.sendUTF('Server Received: '+message.utf8Data);
//             });
//         } else if (message.binaryData) {
//             console.log('Message Received: ' + message.binaryData);
//             connection.sendBytes(message.binaryData);
//         }
//     });
//     connection.on('close', function(reasonCode, description) {
//         for( var i = 0; i < connections.length; i++){ 
//             if ( connections[i] === connection) { 
//                 connections.splice(i, 1); 
//             }
//         }
//         console.log(connections);
//         console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
//     });
// });


// wsServer.on('connection', function(requset) {
//     var connection = request.accept();
//     console.log("someone connected");
//     console.log(requset);
//     connection.on('message', function(data) {
//         console.log(data);
//     })
// });