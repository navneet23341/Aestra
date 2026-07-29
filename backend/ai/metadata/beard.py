import cv2
import mediapipe as mp
import numpy as np

mp_face = mp.solutions.face_mesh


def extract_beard(image, rgb):

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

        h, w = image.shape[:2]

        chin = landmarks[152]

        x = int(chin.x * w)
        y = int(chin.y * h)

        roi = image[
            max(0, y - 40):min(h, y + 40),
            max(0, x - 50):min(w, x + 50)
        ]

        if roi.size == 0:

            return {

                "detected": False

            }

        gray = cv2.cvtColor(

            roi,

            cv2.COLOR_BGR2GRAY

        )

        darkness = np.mean(gray)

        return {

            "detected": True,

            "darkness": float(darkness)
        }