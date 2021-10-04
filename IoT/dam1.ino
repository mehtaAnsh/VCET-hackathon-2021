
// Define pins for ultrasonic and buzzer
int const trig_Pin = 10;
int const echo_Pin = 9;
int const buzz_Pin = 2;
float echo_time = 0;
float distance = 0;

void setup()
{
 pinMode(trig_Pin,OUTPUT); //trigger pin
 pinMode(echo_Pin,INPUT);  //echo pin
 pinMode(buzz_Pin,OUTPUT); //buzzer
}

void loop()
{
  Serial.begin(115200);
 digitalWrite(buzz_Pin,LOW);
 digitalWrite(trig_Pin,LOW);
 delayMicroseconds(2);
 digitalWrite(trig_Pin,HIGH);
 delayMicroseconds(10);
 digitalWrite(trig_Pin,LOW);
 delayMicroseconds(2);

 echo_time=pulseIn(echo_Pin,HIGH);
 Serial.println(echo_time);
 distance = echo_time*340/20000;
 Serial.println(distance);
if(distance<40)
{
 digitalWrite(buzz_Pin,HIGH);
 delay(2000);
}
else
{
 digitalWrite(buzz_Pin,LOW);
 delay(2000);
}
}
