using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CubeMover : MonoBehaviour
{

    private Vector3 jump;
    private float jumpForce = 2.0f;
    private bool isGrounded =true;
    Rigidbody rb;

    void Start(){
        rb = GetComponent<Rigidbody>();
        jump = new Vector3(0.0f, 2.0f, 0.0f);
    }

     public void doJump(){
        if(isGrounded){
        rb.AddForce(jump * jumpForce, ForceMode.Impulse);
        isGrounded = false;
        }
     }

    void OnCollisionStay(){
        //Debug.Log("ground hit");
        isGrounded = true;
    }

}
