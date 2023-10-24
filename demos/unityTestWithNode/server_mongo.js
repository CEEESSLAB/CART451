
const express = require('express');

const app = express();
const { MongoClient } = require("mongodb");
require("dotenv").config();
const url = process.env.MONGO_DB_URI;


app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.listen(4200, () => console.log('started and listening.'));

app.get('/hello', (req, res) => {
    res.send(JSON.stringify({"greeting":"Hello o the world of unity!"}));
})

const client = new MongoClient(url, {});

run();



async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      client.connect().then((res) => {
        console.log("connected");
        const database = client.db("UnityTest");
        const collection = database.collection("MongoData");


        app.use('/postedData',handlePost);
        app.use("/updatePlayer", handleUpdate)

            async function handleUpdate(req,res){
            console.log(req.query);

             await collection.updateOne(
                 { "player_name" : req.query.playerName },
                 { $inc: { "points" : 1 } }
              )
         

            res.send(JSON.stringify({"greeting":"Hello o the world of unity!"}));
            }

        async function handlePost (request, response) {
            let result =  await collection.findOne({'player_name':request.body.player_name});
            console.log(result);
            if(result ===null){
                let t = await collection.insertOne(request.body);
                let result =  await collection.findOne({'player_name':request.body.player_name});

                response.send(result);

            }
            else{
                response.send(result);

            }
            //2 insert
            //
           
          };

         
    
    
  
     
    
    
    })
    

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



// app.get('/jump', (req, res) => {

//     let a = Math.floor(Math.random() *5);
//     let b= Math.floor(Math.random() *5);
//     let c = Math.floor(Math.random() *5);
//     res.send(JSON.stringify({"sphereVal":a,"cubeVal":b, "cylinderVal":c}));
// })