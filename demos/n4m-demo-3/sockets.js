const maxApi = require("max-api");
//import the Express library
let express = require('express');
const portNumber =4200;
let app = express(); //make an instance of express
let server = require('http').createServer(app);  // create a server (using the Express framework object)

//2:: call the require statement
const WebSocket = require("ws");
const wss = new WebSocket.Server({server});

// serving static files
let static = require('node-static'); // for serving static files (i.e. css,js,html...)
// serve anything from this dir ...
app.use(express.static(__dirname + '/public'));
 
//default route
app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});
 
// make server listen for incoming messages
server.listen(portNumber, function(){
  maxApi.post('listening on port:: '+portNumber);
})



//make a route to test page...(put ontop of the first app.use())
app.use('/clientCanvas', wsClientRequestRoute);
//and the function:
function wsClientRequestRoute(req, res, next) {
    res.sendFile(__dirname + '/public/client.html');
}

//wss listens for the connection event for incoming sockets, and if one is connected -:
//ws is  a single socket instance
//req is the request
wss.on('connection', function connection(ws,req) {

    
    ws.on('message', function incoming(message) {

        //from public html
        let jsonParse = JSON.parse(message);
        //console.log(jsonParse);


        //maxApi.post( jsonParse);
        if(jsonParse.label ==="note"){
            maxApi.outlet(jsonParse.value);
           
        }
    
    })//message


    // Handle the Max interactions here...
maxApi.addHandler("send",(...args) => {
    maxApi.post("send args: " + args);
    if (args.length === 5) {
        //send via the socket connection ... so there needs to be a client receiving
        send_values(args[0], args[1], args[2],args[3], args[4]);
       // maxApi.post(args);
    }
});


const send_values = function (x, y, r, g, b) {

    ws.send(JSON.stringify({
        "value_1": x,
        "value_2": y,
        "value_r": r,
        "value_g": g,
        "value_b": b,
    }));
};

})//connection




