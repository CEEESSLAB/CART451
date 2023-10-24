using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Text;
using UnityEngine.Networking;


public class MongoPlayer : MonoBehaviour
{
    public float speed = 1.5f;
    private string testUrl = "http://localhost:4200/postedData";
    private string testUrlGet = "http://localhost:4200/updatePlayer";

    
     public MongoData _playerMongoData =null;
     public GameObject thePrefab;
     private int previousPoints;

    void Start()
    {
     
         _playerMongoData = new MongoData();
         _playerMongoData.player_name = "Isabelle";
         StartCoroutine(Upload(_playerMongoData.Stringify(),
         //callbak
         result => {
            Debug.Log(result);
            _playerMongoData = MongoData.CreateFromJSON(result);
             Debug.Log (_playerMongoData.player_name);
             Debug.Log (_playerMongoData.levelNumber);
             Debug.Log (_playerMongoData.points);
             previousPoints = _playerMongoData.points;

             for(float i=-5; i<5; i+=1.5f){
                
                Instantiate(thePrefab, new Vector3(i, .5f, 0), Quaternion.identity);
             }

         }
        ));
    }

    

    void Update()
    {
        if(_playerMongoData!=null){
        if(_playerMongoData.points!= previousPoints){
            Debug.Log(_playerMongoData.points);
            previousPoints = _playerMongoData.points;

            //Make a get request to update the db!
           StartCoroutine(Get());


        }
        }
  
    }

    void FixedUpdate() {
        // Physics related updates here ...
    }


//SAME AS initial ;) - but not to node -> to mongo ...
    public IEnumerator Get()
    {
        //make a get request with query parameters.
        string newRequest = testUrlGet+"?playerName="+_playerMongoData.player_name+ "&points="+_playerMongoData.points;
        //make a get request for the
        using(UnityWebRequest www = UnityWebRequest.Get(newRequest))
        {
            //wait for this to return
            yield return www.SendWebRequest();  

             if (www.result == UnityWebRequest.Result.ConnectionError)
            {
             Debug.Log(www.error);
            }
        else
        {
            if (www.isDone)
            {
                  string result = System.Text.Encoding.UTF8.GetString(www.downloadHandler.data);
                  Debug.Log(result);

            }
        }


        }
    }
    

    //POST
    IEnumerator Upload(string profile,System.Action<string> callback)
    {
    using(UnityWebRequest request = new UnityWebRequest (testUrl,"POST"))
    {

        Debug.Log(testUrl);
      
       // byte[] bodyRaw = Encoding.UTF8.GetBytes(profile);
        request.SetRequestHeader("Content-Type", "application/json; charset=utf-8");
         byte[] rawJson = System.Text.Encoding.UTF8.GetBytes(profile);
        request.uploadHandler = new UploadHandlerRaw(rawJson);
        request.downloadHandler = new DownloadHandlerBuffer();
        yield return request.SendWebRequest();
       
   

         if (request.result == UnityWebRequest.Result.ConnectionError)
            {
             Debug.Log(request.error);
            }
        else
        {

            if(callback != null) 
            {
                string result = System.Text.Encoding.UTF8.GetString(request.downloadHandler.data);
                callback.Invoke(result);
            }

        
        }
     }
    }
}
