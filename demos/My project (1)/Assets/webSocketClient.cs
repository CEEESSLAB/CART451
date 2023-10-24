using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

//https://github.com/endel/NativeWebSocket

using NativeWebSocket;

 public class webSocketClient : MonoBehaviour
{
  WebSocket websocket;
  TestData dataObject = new TestData();

    public GameObject cylinder;
    public GameObject cube;
    public GameObject sphere;

 

  // Start is called before the first frame update
  async void Start()
  {
    websocket = new WebSocket("ws://localhost:4200");

    websocket.OnOpen += () =>
    {
      Debug.Log("Connection open!");
    };

    websocket.OnError += (e) =>
    {
      Debug.Log("Error! " + e);
    };

    websocket.OnClose += (e) =>
    {
      Debug.Log("Connection closed!");
    };

    websocket.OnMessage += (result) =>
    {
    //   Debug.Log("OnMessage!");
    //   Debug.Log(bytes);

      // getting the message as a string
     string message = System.Text.Encoding.UTF8.GetString(result);
     Debug.Log("OnMessage! " + message);

        DataReceivedObject unity_dataObject = DataReceivedObject.CreateFromJSON(message);
        Debug.Log(unity_dataObject.label);
        /* inital handshake */
        if(unity_dataObject.label =="initConnect"){
            //initalConnection ...
               dataObject.source = "unity";
               dataObject.id =unity_dataObject.label;
               dataObject.level = 1;
               dataObject.timeElapsed = 47.5f;
               dataObject.playerName = "Scoobydoo";
               //send the message
               SendWebSocketMessage();
            }
        
        else if(unity_dataObject.label =="moveSphere"){
        
            //need to do something...
          
            Debug.Log(unity_dataObject.payload);
             sphere.GetComponent<SphereMover>().doJump();


        }

         else if(unity_dataObject.label =="moveCube"){
        
            //need to do something...
          
            Debug.Log(unity_dataObject.payload);
             cube.GetComponent<CubeMover>().doJump();


        }
         else if(unity_dataObject.label =="moveCylinder"){
        
            //need to do something...
          
            Debug.Log(unity_dataObject.payload);
             cylinder.GetComponent<CylinderMover>().doJump();


        }
    };

    // waiting for messages
    await websocket.Connect();
  }

  void Update()
  {
    #if !UNITY_WEBGL || UNITY_EDITOR
      websocket.DispatchMessageQueue();
    #endif
  }

  async void SendWebSocketMessage()
  {
    if (websocket.State == WebSocketState.Open)
    {
      // Sending bytes
     // await websocket.Send(new byte[] { 10, 20, 30 });

    string dataObject_asJson = JsonUtility.ToJson(dataObject);

      // Sending plain text
      await websocket.SendText(dataObject_asJson);
    }
  }

 async void OnApplicationQuit()
  {
    await websocket.Close();
  }



[Serializable]
// to convert data to send from unity -> json
public class TestData
{
    public string id;
    public int level;
    public float timeElapsed;
    public string playerName;
    public string source;
}

// to convert data received into a unity obj
public class DataReceivedObject
{
 public string id;
 public string label;
 public string payload;
 public static DataReceivedObject CreateFromJSON(string jsonString)
        {
                  
            return JsonUtility.FromJson<DataReceivedObject>(jsonString);
        }
}




}
