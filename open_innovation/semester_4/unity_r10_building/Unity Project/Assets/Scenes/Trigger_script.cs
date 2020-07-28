using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;
public class Trigger : MonoBehaviour {
    bool triggered1;
    bool triggered2;

    public GameObject Button1;
    public GameObject Button2;
    


    public string file = "Assets/Scenes/triggers.json";



   
    void WriteToFile()
    {
       
        FileStream fileStream = new FileStream("Assets/Scenes/triggers.json", FileMode.Create);
        using (StreamWriter writer = new StreamWriter(fileStream))
        {
            string JsonString = "{\"Triggers\": {\"id1\": " + triggered1.ToString().ToLower() + ",\"id2\": " + triggered2.ToString().ToLower() + "}}";
            
            //string JsonString = "{\"Triggers\": {\"id1\": " + triggered1.ToString().ToLower() + "}}";
            //{\"id2\":"+ triggered2.ToString().ToLower() + "} tussen de laatste 2 }} in ^^
            Debug.Log(JsonString);
            writer.Write(JsonString);
        }

    }
   
    void Start()
    {
       

    }


    void OnTriggerEnter(Collider other)
    {

        
        if (other.tag == "Player" && this.gameObject == Button1)
        {
            
            if (triggered1)
            {
                return;
            }
            triggered1 = true;


            WriteToFile();
        }
        else if (other.tag == "Player" && this.gameObject == Button2)
        {
            if (triggered2)
            {
                return;
            }
            triggered2 = true;

            WriteToFile();
        }
    }
    void OnTriggerExit(Collider other)
    {
        if (other.tag == "Player" && this.gameObject == Button1)
        {
            if (!triggered1)
            {
                return;
            }
            triggered1 = false;
            WriteToFile();

        }
        else if (other.tag == "Player" && this.gameObject == Button2)
        {
            if (!triggered2)
            {
                return;
            }
            triggered2 = false;
            WriteToFile();
        }
    }
}
