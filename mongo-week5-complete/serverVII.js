const express = require("express");
const portNumber = 4200;
const app = express(); //make an instance of express
const server = require("http").createServer(app);

let bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
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

    let data = [
      {
        country: "Spain",
        city: "Salamanca",
        name: "USAL",
        location: {
          type: "Point",
          coordinates: [-5.6722512, 17, 40.9607792],
        },
        students: [
          { year: 2014, number: 24774 },
          { year: 2015, number: 23166 },
          { year: 2016, number: 21913 },
          { year: 2017, number: 21715 },
        ],
      },
      {
        country: "Spain",
        city: "Salamanca",
        name: "UPSA",
        location: {
          type: "Point",
          coordinates: [-5.6691191, 17, 40.9631732],
        },
        students: [
          { year: 2014, number: 4788 },
          { year: 2015, number: 4821 },
          { year: 2016, number: 6550 },
          { year: 2017, number: 6125 },
        ],
      },
    ];

    let courseData = [
      {
        university: "USAL",
        name: "Computer Science",
        level: "Excellent",
      },
      {
        university: "USAL",
        name: "Electronics",
        level: "Intermediate",
      },
      {
        university: "USAL",
        name: "Communication",
        level: "Excellent",
      },
    ];

    const database = client.db("sabineTest");
    const universities = database.collection("universities");
    const courses = database.collection("courses");

    //1: Insert Many
    // await universities.insertMany(data);
    //await courses.insertMany(courseData);
    //console.log("done");

    //2: Insert One
    //  await courses.insertOne({
    //     university : 'UPSA',
    //     name : 'Communication',
    //     level : 'Intermediate'

    //  })

    //  await universities.insertOne({

    //     country : 'Spain',
    //     city : 'Barcelona',
    //     name : 'UPBA',
    //     location : {
    //       type : 'Point',
    //       coordinates : [ 2.1686, 41.3874 ]
    //     },
    //     students : [
    //       { year : 2014, number : 2788 },
    //       { year : 2015, number : 3821 },
    //       { year : 2016, number : 2550 },
    //       { year : 2017, number : 2125 }
    //     ]
    //   })

    console.log("done");
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

app.use("/varsToMongo", handleGetVars);

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
app.post("/postForm", handlePost);

// the callback
function handlePost(request, response) {
  console.log(request.body);
  response.send("SUCCESS POST");
}

//EXAMPLE of  user making a query ... 10
async function handleGetVars(request, response, next) {
  console.log(request.url);
  console.log(request.query.paramOne);
  response.send("SUCCESS GET");
}
