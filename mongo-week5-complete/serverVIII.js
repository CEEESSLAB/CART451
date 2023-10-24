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

    const database = client.db("sabineTest");
    const universities = database.collection("universities");
    const courses = database.collection("courses");

    //a:
    // let matches = await universities.aggregate([
    //     { $match : { country : 'Spain', city : 'Salamanca' } }
    //   ])
    //   console.log(matches);

    // //b
    //   let projected_out = await universities.aggregate([
    //     { $match : { country : 'Spain', city : 'Salamanca' } },
    //     { $project : { _id : 0, country : 1, city : 1, name : 1 } }
    //   ]).toArray()
    //   console.log(projected_out)

    //c
    //   let grouped_out = await universities.aggregate([
    //     { $match : { country : 'Spain', city : 'Salamanca' } },
    //     { $project : { _id : 0, country : 1, city : 1, name : 1 } },
    //     { $group : { _id : '$name', totaldocs : { $sum : 1 } } }

    //   ]).toArray()
    //   console.log(grouped_out)

    //d
    //    let unwound =  await universities.aggregate([
    //         { $match : { name : 'USAL' } },
    //         { $unwind : '$students' }
    //       ]).toArray()

    //       console.log(unwound);

    // //e
    //    let sorted = await universities.aggregate([
    //     { $match : { country : 'Spain', city : 'Salamanca' } },
    //     { $unwind : '$students' },
    //     { $project : { _id :0, 'students.number':1, 'students.year':1} },
    //     { $sort : { 'students.number':-1,} },

    //   ]).toArray();
    //   console.log(sorted)

    //f
    //    let limited = await universities.aggregate([
    //     { $match : { country : 'Spain', city : 'Salamanca' } },
    //     { $unwind : '$students' },
    //     { $project : { _id :0, 'students.number':1, 'students.year':1} },
    //     { $sort : { 'students.number':1,} },
    //     {$limit:2}

    //   ]).toArray();
    //   console.log(limited)

    //g
    // let counted = await universities.aggregate([
    //     { $match : { country : 'Spain', city : 'Salamanca' } },
    //     {$count: "salamanca_students" }

    // ]).toArray();
    // console.log(counted);

    //h :: with the airbnb lets also count (groups)
    const database_air = client.db("sample_airbnb");
    const lists_revs = database_air.collection("listingsAndReviews");
    let matchedHosts = await lists_revs
      .aggregate([
        { $match: { "host.host_name": "Karen" } },
        { $count: "hosts_named_josh" },
      ])
      .toArray();

    console.log(matchedHosts);

    //h :: with the airbnb lets also  (groups)

    let grouped_Hosts = await lists_revs
      .aggregate([
        { $group: { _id: "$host.host_name", totaldocs: { $sum: 1 } } },
      ])
      .toArray();

    console.log(grouped_Hosts);

    //i
    // groupedHosts.length === (IS EQUAL TO)

    let grouped_Hosts_count = await lists_revs
      .aggregate([
        { $group: { _id: "$host.host_name", totaldocs: { $sum: 1 } } },
        { $count: "groups" },
      ])
      .toArray();
    console.log(grouped_Hosts_count);
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
