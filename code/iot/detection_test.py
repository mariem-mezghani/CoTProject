import cv2
import pandas as pd
from ultralytics import YOLO
from tracker import *
import cvzone
import numpy as np

cap = cv2.VideoCapture(0, cv2.CAP_V4L2)

model = YOLO('best.pt')

while True:
    ret, frame = cap.read()
    results = model.predict(frame, conf=0.5, device=0)
    frame = results[0].plot()
    if cv2.waitKey(1) & 0xFF == 27:
        break
       
cap.realease()
cv2.destroyAllWindows()