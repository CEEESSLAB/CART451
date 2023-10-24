window.onload = function () {
  console.log("client js loaded in ws example");
  document.getElementById("pixel").style.left = 10+"px";
  document.getElementById("pixel").style.top = 10+"px";
 /* Establishing a WebSocket relies on the HTTP Upgrade mechanism , so the request for the protocol upgrade is implicit 
   * when we address the web server as ws://www.example.com or wss://www.example.com.
   *  We are upgrading the HTTP conncection to a web socket connection
   * The WebSocket() constructor doees all the work to create the initial http connection 
   * and the handshaking protocol for you
   */
  let ws = new WebSocket("ws://localhost:4200");
//1: when the connection is open (setup)
  ws.onopen = function () {
    

    document.querySelectorAll(".button").forEach(function(el) {
      el.addEventListener("click",function(){
      
        ws.send(JSON.stringify({label:"note",value:el.id}))
      })

    })
     //2: when we receive something
     ws.onmessage = function (event) {
      let receivedMsg = JSON.parse(event.data);

      console.log("Message is received..." + receivedMsg);
      console.log(receivedMsg);
      let currentxPos = parseInt(document.getElementById("pixel").style.left);
      let currentyPos = parseInt(document.getElementById("pixel").style.top);
      //console.log(currentxPos);
     document.getElementById("pixel").style.left = currentxPos+receivedMsg.value_1+"px";
     document.getElementById("pixel").style.top = currentyPos+receivedMsg.value_2+"px";
      //reset
      if(currentyPos+receivedMsg.value_2 >500){
        document.getElementById("pixel").style.top ='10px';
       }

      if(currentxPos+receivedMsg.value_1 >500){
        document.getElementById("pixel").style.left ='10px';

      }
      document.getElementById("pixel").style.background = `rgb(${receivedMsg.value_r},${receivedMsg.value_g},${receivedMsg.value_b})`
      
 };

 }
 
  //2: when websocket closes
  ws.onclose = function () {
 
    // websocket is closed.
    console.log("Connection is closed...");
  };
 }