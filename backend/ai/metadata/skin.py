import cv2
import numpy as np
import mediapipe as mp

mp_face = mp.solutions.face_mesh


def average_color(image, point, radius=12):

    h, w = image.shape[:2]

    x = int(point.x * w)
    y = int(point.y * h)

    x1 = max(0, x - radius)
    y1 = max(0, y - radius)

    x2 = min(w, x + radius)
    y2 = min(h, y + radius)

    roi = image[y1:y2, x1:x2]

    mean = roi.mean(axis=(0, 1))

    return mean


def extract_skin(image, rgb):

    with mp_face.FaceMesh(
        static_image_mode=True,
        max_num_faces=1
    ) as face:

        result = face.process(rgb)

        if not result.multi_face_landmarks:

            return {
                "detected": False
            }

        landmarks = result.multi_face_landmarks[0].landmark

        left = average_color(
            image,
            landmarks[234]
        )

        right = average_color(
            image,
            landmarks[454]
        )

        color = (left + right) / 2

        b, g, r = color.astype(int)

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