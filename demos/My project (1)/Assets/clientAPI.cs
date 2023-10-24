using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class NewBehaviourScript : MonoBehaviour
{
    // Start is called before the first frame update
    public string url;
    public string helloWorldUrl;
    public GameObject cylinder;
    public GameObject cube;
    public GameObject sphere;
    void Start()
    {
      
        StartCoroutine(Get(helloWorldUrl));
    }

    // Update is called once per frame
    void Update()
    {
        if(Input.GetKeyDown(KeyCode.Space)){
              StartCoroutine(Get(url));
        }
        
    }

    /* class to convert from JSON string to C# object */

    public class Greeting{
        public string greeting;

        public static Greeting CreateFromJSON(string jsonString)
        {
                  
            return JsonUtility.FromJson<Greeting>(jsonString);
        }
  
    }
    /* class to convert from JSON string to C# object */
    public class PlayerInfo
    {
        public int  sphereVal;
        public int cubeVal;
        public int cylinderVal;
        
        public static PlayerInfo CreateFromJSON(string jsonString)
        {
            return JsonUtility.FromJson<PlayerInfo>(jsonString);
        }
        
        // Given JSON input:
        // {"sphereVal":2,"cubeVal":0, "cylinderVal":3}
        // this example will return a PlayerInfo object with
        // sphereVal == 2, cubeVal == 0, and cylinderVal:3.
    }
    
    
    /*will define a method that returns an IEnumerator that enables async-like functionality in unity*/
    
    //https://docs.unity3d.com/ScriptReference/Networking.UnityWebRequest.Get.html
    
    public IEnumerator Get(string url)
    {
        //make a get request for the
        using(UnityWebRequest www = UnityWebRequest.Get(url))
        {
            //wait for this to return
            yield return www.SendWebRequest();    
        
        
//      UnityWebRequest www = UnityWebRequest.Get(url)
//      try {
//          yield return www.SendWebRequest()
//      }
//      finally {
//          if (www != null) {
//              ((IDisposable)www).Dispose();
//          }
//
//  }
  
        if (www.result == UnityWebRequest.Result.ConnectionError)
        {
            Debug.Log(www.error);
        }
        else
        {
            if (www.isDone)
            {
                //ROUTE 1...
                if (url.EndsWith("hello")){
                    
                    string result = System.Text.Encoding.UTF8.GetString(www.downloadHandler.data);
                    Greeting info = Greeting.CreateFromJSON(result);
                    Debug.Log(info.greeting);

                }
                //ROUTE 2...
                else if(url.EndsWith("jump")){
                    // handle the result
                    string result = System.Text.Encoding.UTF8.GetString(www.downloadHandler.data);
                    Debug.Log(result);
                    PlayerInfo jumper = PlayerInfo.CreateFromJSON(result);
                    Debug.Log(jumper.cubeVal);
                    Debug.Log(jumper.sphereVal);
                    Debug.Log(jumper.cylinderVal);

                    //effect the game objects
                    if(jumper.cylinderVal>0){
                        cylinder.GetComponent<CylinderMover>().doJump();
                    }

                    if(jumper.sphereVal>0){
                        sphere.GetComponent<SphereMover>().doJump();
                    }

                    if(jumper.cubeVal>0){
                        cube.GetComponent<CubeMover>().doJump();
                    }
                }
            }
            else
            {
                //handle the problem
                Debug.Log("Error! data couldn't get.");
            }
                    
        }
      }
    }
}


    