import cv2
import mediapipe as mp
import numpy as np

mp_face = mp.solutions.face_mesh


def average_color(image, point, radius=10):

    h, w = image.shape[:2]

    x = int(point.x * w)
    y = int(point.y * h)

    x1 = max(0, x - radius)
    y1 = max(0, y - radius)

    x2 = min(w, x + radius)
    y2 = min(h, y + radius)

    roi = image[y1:y2, x1:x2]

    return roi.mean(axis=(0, 1))


def extract_hair(image, rgb):

    with mp_face.FaceMesh(

        static_image_mode=True,

        max_num_faces=1

    ) as mesh:

        result = mesh.process(rgb)

        if not result.multi_face_landmarks:

            return {

                "detected": False

            }

        landmarks = result.multi_face_landmarks[0].landmark

        forehead = landmarks[10]

        h, w = image.shape[:2]

        x = int(forehead.x * w)
        y = int(forehead.y * h)

        # sample above forehead
        y = max(10, y - 50)

        roi = image[
            max(0, y - 20):y + 20,
            max(0, x - 40):x + 40
        ]

        if roi.size == 0:

            return {

                "detected": False

            }

        b, g, r = roi.mean(axis=(0, 1)).astype(int)

        return {

            "detected": True,

            "rgb": [

                int(r),

                int(g),

                int(b)

            ],

            "hex": "#{:02X}{:02X}{:02X}".format(

                int(r),

                int(g),

                int(b)

            )
        }