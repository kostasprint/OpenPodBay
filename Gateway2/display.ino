#define STATUS_OK 1
#define STAUTS_NO_SERVER 2

int state = STATUS_OK;

int ledState = LOW;
volatile unsigned long blinkCount = 0;

void ledStatus() {
  if(state==STATUS_OK) {
    digitalWrite(pinGreen, HIGH);
  } else if(state==STAUTS_NO_SERVER) {
    digitalWrite(pinRed, HIGH);
    digitalWrite(pinGreen, LOW);
  }
}

void blinkYellowLED(void) {
  if (ledState == LOW) {
    ledState = HIGH;
    blinkCount = blinkCount + 1;  // increase when LED turns on
  } else {
    ledState = LOW;
  }
  
  if(blinkCount > 3) {
    blinkCount = 0;
    ledState = LOW;
    Timer3.detachInterrupt();
  }
  
  digitalWrite(pinYellow, ledState);
}
