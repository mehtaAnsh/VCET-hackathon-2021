# VCET Hackathon 2021
Source code for the solution made at VCET Hackathon 2021. Came as the runner ups out of over 32 teams.

## Directory structure:
```
|
|--admin
|--backend
|--IoT
|--image processing model
|--rainfall predictror
```

### Admin:
- An all-in-one system that provides insights such as Temperature, Precipitation, etc. for the metropolitan cities of India.
- Can issue alerts for citizens, where if they fall in the certain radius, they are notified on SMS and WhatsApp messages
- Can present detailed Satellite images for the affected areas where they can be downloaded for further detailed image-processing

### Backend:
- Contains the entire backend code. 

### IoT:
- An IoT-based flood prevention system that checks the water levels of the dam. 
- If they exceed beyond the threshold, the administration is notified, and the system can take actions by itself on extreme circumstances.

### Image predictor model:
- Compares the before and after affected model.
- Gives the result in the form of white highlighted pixels showing the affected area.

### Rainfall Predictor:
- Analyses the rainfall data and predicts if the average rainfall per year can cause flooding or not.
- Provides a yet other data source to detect the early occurrence of floods. 

## Techonolgies used:

### IoT-based Dam flooding prevention system:
- Arduino IDE (ESP8266), 
- ThingSpeak by MathWorks (IoT-cloud detection system)

### Rainfall Predictor:
- Python
- Pandas, Scikit-learn

### Admin Frontend:
- React, Bootstrap

### Backend:
- Node, Express.js, MongoDB

### Image Processing Model:
- Python
- OpenCV (Computer Vision)

### Hosting:
- Web app and Backend: Heroku
- Database: MongoDB Atlas

### Miscellaneous APIs:
- MapBox (to retrieve high-res satellite images)
- WeatherAPI (to retrieve climatic attributes for cities like temperature, pressure, etc.)
- PositionStack (to retrieve coordinates from Keywords)
- Twilio (to broadcast WhatsApp and SMS messages)

```
Give it a star if you find this helpful.
```
