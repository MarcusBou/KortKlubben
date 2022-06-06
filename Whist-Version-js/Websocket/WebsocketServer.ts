var WebSocketServer = require('websocket').server;
var http = require('http');
var connections = [];

var server = new http.createServer(function (request, response) {
    console.log((new Date()) + ': Recieved request for ' + request.url);
    response.writeHead(404);
    response.end();
});

server.listen(5000, function() {
    console.log((new Date()) + ': Server port is 5000');
});

var wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
});

function originIsAllowed(origin) {
    console.log(origin)
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

wsServer.on('open', function(data) {
    console.log("server open");
})

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    var connection = request.accept();
    connections.push(connection);
    console.log(connections);
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Message Received: ' + message.utf8Data)
            connections.forEach(con => {
                con.sendUTF('Server Received: '+message.utf8Data);
            });
        } else if (message.binaryData) {
            console.log('Message Received: ' + message.binaryData);
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        for( var i = 0; i < connections.length; i++){ 
            if ( connections[i] === connection) { 
                connections.splice(i, 1); 
            }
        }
        console.log(connections);
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});


wsServer.on('connection', function(requset) {
    var connection = request.accept();
    console.log("someone connected");
    console.log(requset);
    connection.on('message', function(data) {
        console.log(data);
    })
});