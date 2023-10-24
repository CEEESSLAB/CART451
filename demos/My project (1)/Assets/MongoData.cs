using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MongoData 
{
   //public string id;
   public string player_name;
    public int levelNumber;
    public int points;
   

// NEW:: takes all public vars and converts to a string
      public string Stringify() 
    {
        
        return JsonUtility.ToJson(this);
    }

     public static MongoData CreateFromJSON(string jsonString)
    {
            
     return JsonUtility.FromJson<MongoData>(jsonString);
    }

   

}
