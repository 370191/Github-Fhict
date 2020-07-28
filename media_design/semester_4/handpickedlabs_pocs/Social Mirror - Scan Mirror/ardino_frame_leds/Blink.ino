int groen = 13; // Groen LED pin
int blauw = 10; // blauw LED pin
int rood = 9; // good LED pin
int geel = 7; // geel LED pin

void setup() {
  pinMode(groen, OUTPUT); // Declare the LED as an output
  pinMode(blauw, OUTPUT); // Declare the LED as an output
  pinMode(rood, OUTPUT); // Declare the LED as an output
  pinMode(geel, OUTPUT); // Declare the LED as an output

}


// the loop function runs over and over again forever
void loop() {
  digitalWrite(groen, HIGH);
  digitalWrite(blauw, LOW);  
  digitalWrite(rood, LOW);   
  digitalWrite(geel, LOW);  
  delay(1000);               
  digitalWrite(groen, LOW);
  digitalWrite(blauw, HIGH);  
  digitalWrite(rood, LOW);
  digitalWrite(geel, LOW);   
  delay(1000);      
    digitalWrite(groen, LOW);
  digitalWrite(blauw, LOW);  
  digitalWrite(rood, HIGH);   
  digitalWrite(geel, LOW);  
  delay(1000);    
      digitalWrite(groen, LOW);
  digitalWrite(blauw, LOW);  
  digitalWrite(rood, LOW);   
  digitalWrite(geel, HIGH);  
  delay(1000);          
}
