let ws = new WebSocket('ws://localhost:3000');

let controllTDR = document.querySelector('.controllTDR');
controllTDR.addEventListener('input', (event) => {
  ws.send(JSON.stringify( { 'slider1': controllTDR.value } ));
}, false);

let controllTDG = document.querySelector('.controllTDG');
controllTDG.addEventListener('input', (event) => {
  ws.send(JSON.stringify( { 'slider2': controllTDG.value  } ));
}, false);

let controllTDB = document.querySelector('.controllTDB');
controllTDB.addEventListener('input', (event) => {
  ws.send(JSON.stringify( { 'slider3': controllTDB.value / 100 } ));
}, false);


let controlledByTD = document.querySelector('.controlledByTD');

ws.addEventListener('open', (event) => {
  console.log('Socket connection open');
  // alert('Successfully connected to socket server 🎉');
  ws.send('pong');
});

ws.addEventListener('message', (message) => {
  if (message && message.data) {
    if (message.data === "ping") {
      console.log("got ping");
      ws.send("pong");
      return;
    }
    let data = JSON.parse(message.data);
    if (data) {
      if ("slider" in data) {
        controlledByTD.value = data["slider"] * 100;
        document.body.style.background = "rgb(" + Math.random() * controlledByTD.value + ", " + Math.random() * controlledByTD.value + ", " + Math.random() * controlledByTD.value + ", "+ Math.random() * data["slider"] +" )";
//         document.body.style.background = "linear-gradient(to bottom, " + controlledByTD.value + ", " + controlledByTD.value + ")";
      }
      console.log("got data", data);
    }
  }
  console.log("message", message)
});

ws.addEventListener('error', (error) => {
    console.error('Error in the connection', error);
    alert('error connecting socket server', error);
});

ws.addEventListener('close', (event) => {
    console.log('Socket connection closed');
    alert('closing socket server');
});
