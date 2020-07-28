#include <Mouse.h>

int joystickhorizontalePin = A0; // Analoge output van horizontale joystick pin
int joystickverticalePin = A1;   // Analoge output van verticale joystick pin
int joystickknopPin = 9;         // Knop pin van joystick

int verticaleinactiefwaarde, horizontaleinactiefwaarde; // Slaat de beginwaarde van elke as op
int verticalewaarde, horizontalewaarde;                 // Slaat de huidige waarde van elke as op

const int gevoeligheid = 400; // Hogere gevoeligheids waarde = langzamere muis, ongeveer 500
int muisklik = 0;

int muisomgekeerd = 1;      // Draai de joystick om op basis van oriëntatie
int muisnietomgekeerd = -1; // Draai de joystick NIET om op basis van oriëntatie

void setup()
{
    pinMode(horzPin, INPUT); // Set both analog pins as inputs
    pinMode(vertPin, INPUT);
    pinMode(selPin, INPUT);         // set button select pin as input
    digitalWrite(selPin, HIGH);     // Pull button select pin high
    delay(1000);                    // short delay to let outputs settle
    vertZero = analogRead(vertPin); // get the initial values
    horzZero = analogRead(horzPin); // Joystick should be in neutral position when reading these

    Mouse.begin(); //Init mouse emulation
}

void loop()
{
    vertValue = analogRead(vertPin) - vertZero; // read vertical offset
    horzValue = analogRead(horzPin) - horzZero; // read horizontal offset

    if (vertValue != 0)
        Mouse.move(0, (invertMouse * (vertValue / sensitivity)), 0); // move mouse on y axis
    if (horzValue != 0)
        Mouse.move((1 * (horzValue / sensitivity)), 0, 0); // move mouse on x axis

    if ((digitalRead(selPin) == 0) && (!mouseClickFlag)) // if the joystick button is pressed
    {
        mouseClickFlag = 1;
        Mouse.press(MOUSE_LEFT); // click the left button down
    }
    else if ((digitalRead(selPin)) && (mouseClickFlag)) // if the joystick button is not pressed
    {
        mouseClickFlag = 0;
        Mouse.release(MOUSE_LEFT); // release the left button
    }
}