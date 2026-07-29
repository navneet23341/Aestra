import cv2
import mediapipe as mp
import json
import sys

from body import extract_body
from face import extract_face
from skin import extract_skin
from hair import extract_hair
from glasses import extract_glasses
from beard import extract_beard

from hair_classifier import classify_hair
from beard_classifier import classify_beard
from classifier import classify_body
from face_classifier import classify_face

image_path = sys.argv[1]

image = cv2.imread(image_path)

if image is None:

    print(json.dumps({
        "success": False,
        "message": "Image not found"
    }))

    sys.exit()

# Convert image first
rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

metadata = {}

# Body
body = extract_body(rgb)

body["attributes"] = classify_body(body)

metadata["body"] = body

# Face
face = extract_face(rgb)

if face["detected"]:

    face["attributes"] = classify_face(face)

metadata["face"] = face

metadata["skin"] = extract_skin(

    image,

    rgb

)

metadata["hair"] = extract_hair(

    image,

    rgb

)

metadata["hair_attributes"] = classify_hair(

    metadata["hair"]

)

metadata["glasses"] = extract_glasses(

    rgb

)

metadata["beard"] = extract_beard(

    image,

    rgb

)

metadata["beard_attributes"] = classify_beard(

    metadata["beard"]

)

print(json.dumps(metadata))