
const express = require('express');
const app = express();


app.listen(3000, () => console.log('started and listening.'));

app.get('/hello', (req, res) => {
    res.send(JSON.stringify({"greeting":"Hello o the world of unity!"}));
})

app.get('/jump', (req, res) => {

    let a = Math.floor(Math.random() *5);
    let b= Math.floor(Math.random() *5);
    let c = Math.floor(Math.random() *5);
    res.send(JSON.stringify({"sphereVal":a,"cubeVal":b, "cylinderVal":c}));
})