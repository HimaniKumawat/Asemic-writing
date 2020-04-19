int soundpin = A0;
int sig = 0;

void setup() {
  Serial.begin(9600);         // To send and read the data.
}

void loop() {
  sig = analogRead(soundpin);   // Input data from the sensor.
  //Serial.println(sig);    // For the checking the values.
  Serial.write(sig);        // Writing the data collected in the serial port.
}
