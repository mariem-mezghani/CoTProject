import cv2
import time
import json
import paho.mqtt.publish as publish
import base64
from ultralytics import YOLO  # Make sure to install the ultralytics library

# MQTT configuration
mqtt_broker = "102.37.144.78"
mqtt_port = 1883
mqtt_topic = "test"

# Load YOLO model
model = YOLO('best.pt')

# Example usage
try:
    cap = cv2.VideoCapture(0)  # Use the default camera (change the index if needed)

    while True:
        ret, frame = cap.read()

        # YOLO model prediction
        results = model.predict(frame, conf=0.5, device=0)

        # Check if objects are detected
        if results[0].boxes.xyxy.size(0)>0:
            # Convert the image to base64
            _, buffer = cv2.imencode('.jpg', frame)
            base64_string = base64.b64encode(buffer).decode()

            # Prepare payload
            payload = {"id": "1", "image": base64_string}
            print(payload)
            json_payload = json.dumps(payload)

            # Send to Mosquitto
            publish.single(mqtt_topic, json_payload, hostname=mqtt_broker, port=mqtt_port,
                           auth={'username': 'username', 'password': 'Azureuser12*'})

        time.sleep(60)  # Adjust the sleep time as needed

except KeyboardInterrupt:
    cap.release()
