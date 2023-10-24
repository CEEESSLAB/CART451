const express = require('express');
const portNumber = 4200;
const WebSocket = require("ws");
const uuid = require('node-uuid');

const app = express(); //make an instance of express
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });
// create a server (using the Express framework object)
app.use(express.static(__dirname + '/public'));
app.use('/client', wsClientRequestRoute);

function wsClientRequestRoute(req, res, next) {
    res.sendFile(__dirname + '/public/ws.html');
}

// make server listen for incoming messages
server.listen(portNumber, function () {
    console.log('listening on port:: ' + portNumber);
})

//wss listens for the connection event for incoming sockets, and if one is connected -:
//ws is  a single socket instance
//req is the request
wss.on('connection', function connection(ws, req) {
    ws.id = uuid.v4();
    ws.send(JSON.stringify({id:ws.id,label:"initConnect"}));
    console.log("one time");
  
    // // regardless of type of message this is always the trigger function
    ws.on('message', function incoming(message) {
       // console.log(`received client[${ws.id}]: ${message}`)
       // console.log("received");
       // console.log('received: %s', message);
     
    let jsonParse = JSON.parse(message);
     //console.log(jsonParse.level);
    
     if(jsonParse.source===("unity")){
        console.log("from unity");
        console.log(jsonParse);
     }

     else if (jsonParse.source ===('web')){
        console.log("from web");
        console.log(jsonParse);
        
        //send to  unity ...
        wss.clients.forEach(function each(client) {
            //if client is not this one  ... and to fix will send to other web clients :)
            if(client!==ws){
                if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({id:client.id,label:jsonParse.label,payload:jsonParse.payload}));
                }
            }
        });
    

}
     
  

    })
})


