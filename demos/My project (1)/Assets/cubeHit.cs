
    using System.Collections;  
    using System.Collections.Generic;  
    using UnityEngine;  
    using UnityEngine.SceneManagement;  
      
    public class cubeHit: MonoBehaviour {  
        private GameObject mongoClient;
      // Start is called before the first frame update    
      void Start() {
        mongoClient = GameObject.Find("mongoclient");
      }

      
      // Update is called once per frame    
      void Update() {  
       //Check for mouse click 
        if (Input.GetMouseButtonDown(0))
        {
            RaycastHit raycastHit;
            Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
            if (Physics.Raycast(ray, out raycastHit, 10f))
            {
                if (raycastHit.transform != null)
                {
                   if(raycastHit.transform.gameObject ==this.gameObject){
                    Debug.Log("hit");
                     Renderer cubeRenderer = this.GetComponent<Renderer>();
                      cubeRenderer.material.SetColor("_Color", Color.red);
                      mongoClient.GetComponent<MongoPlayer>()._playerMongoData.points++;
                   }
                
                }
            }
        }
      }  
    }   

