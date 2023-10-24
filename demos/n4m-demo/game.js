
//https://cycling74.com/articles/node-for-max-intro-%E2%80%93-let%E2%80%99s-get-started
//pull in library that allows for max communication
const maxApi = require("max-api");
//post to the max console -> then if you set up your max patch it will log there
//the object in max called node.debug also alows for console out
maxApi.post("hello from node");

//from max to node -> send message from max to node.script which in turn
//calls a function in  node -> message,callback
maxApi.addHandler("greeting", function () {
  maxApi.post("greetings from node!");
});

//pixel mover ::: we will get key input from user and send to node .. (key object)
//w is 119 -> up
//a is 97 -> left
//s 115 -> down
//d is 100 -> right
//receiving a list now /// the received arg in the callback will be the second item (that we prepended)
let x = 0;
let y = 0;
maxApi.addHandler("input", function (inputDir) {
  // maxApi.post(`from node: ${inputDir}`);
  //use inputDir to change x and y
  switch (inputDir) {
    case "UP":
      y--;
      break;
    case "LEFT":
      x--;
      break;
    case "DOWN":
      y++;
      break;
    case "RIGHT":
      x++;
      break;
  }
   maxApi.post(`from node: x: ${x}, y: ${y}`);
   // to pass these values to the patcher we use:
   maxApi.outlet(x,y); //will be sent oUT of the node.script object
});
