const express = require("express");
const portNumber = 4200;
const app = express(); //make an instance of express
const server = require("http").createServer(app);

let bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
require("dotenv").config();  

const { MongoClient } = require('mongodb');
const url = process.env.MONGO_DB_URI
// Database Name

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url, {});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    //1: get the database names ... 
    const result = await client.db("admin").command({ listDatabases: 1, nameOnly: true });
    //console.log(result.databases);

    //2: get a ref to a particluar db
    let ref = await client.db("sample_airbnb")
    //console.log(ref)

    //3: get collections
    let air_colls = await ref.listCollections().toArray();
    let listingsAndReviews = air_colls[0];
    console.log(listingsAndReviews)








} // in try 
catch (error) {
    console.error("error::");
    console.log(error);
    // Expected output: ReferenceError: nonExistentFunction is not defined
    // (Note: the exact output may be browser-dependent)
  }
 /* The finally block will always execute before control flow exits the try...catch...finally construct. 
 It always executes, regardless of whether an exception was thrown or caught.*/
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run()


app.use('/varsToMongo',handleGetVars);

// make server listen for incoming messages
server.listen(portNumber, function () {
  console.log("listening on port:: " + portNumber);

});
// create a server (using the Express framework object)
app.use(express.static(__dirname + "/public"));
app.use("/client", clientRoute);
//default route
app.get("/", function (req, res) {
  res.send("<h1>Hello world</h1>");
});

function clientRoute(req, res, next) {
  res.sendFile(__dirname + "/public/client.html");
}

/// use this VERB for getting posted data... 9
app.post('/postForm',handlePost);
 
// the callback
function handlePost(request,response){
  console.log(request.body);
  response.send("SUCCESS POST");
}

//EXAMPLE of  user making a query ... 10
async function  handleGetVars  (request,response,next){
  console.log(request.url);
  console.log(request.query.paramOne);
  response.send("SUCCESS GET");
}

