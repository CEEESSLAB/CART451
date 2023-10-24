const express = require("express");
const portNumber = 4200;
const app = express(); //make an instance of express
const server = require("http").createServer(app);

// create a server (using the Express framework object)
app.use(express.static(__dirname + "/public"));

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.use("/client", clientRoute);
require("dotenv").config();

const { MongoClient } = require("mongodb");
const url = process.env.MONGO_DB_URI;
// Database Name

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url, {});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    // in try
    console.error("error::");
    console.log(error);
    // Expected output: ReferenceError: nonExistentFunction is not defined
    // (Note: the exact output may be browser-dependent)
  } finally {
    /* The finally block will always execute before control flow exits the try...catch...finally construct. 
 It always executes, regardless of whether an exception was thrown or caught.*/
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run();

// make server listen for incoming messages
server.listen(portNumber, function () {
  console.log("listening on port:: " + portNumber);
});

//default route
app.get("/", function (req, res) {
  res.send("<h1>Hello world</h1>");
});

function clientRoute(req, res, next) {
  res.sendFile(__dirname + "/public/client.html");
}
