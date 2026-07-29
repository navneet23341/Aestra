import math
import mediapipe as mp

mp_face = mp.solutions.face_mesh


def distance(a, b):

    return math.sqrt(

        (a.x - b.x) ** 2 +

        (a.y - b.y) ** 2

    )


def extract_face(rgb):

    data = {}

    with mp_face.FaceMesh(

        static_image_mode=True,

        max_num_faces=1

    ) as face:

        result = face.process(rgb)

        if not result.multi_face_landmarks:

            data["detected"] = False

            return data

        landmarks = result.multi_face_landmarks[0].landmark

        data["detected"] = True

        # ----------------------------
        # Key Face Landmarks
        # ----------------------------

        LEFT_CHEEK = 234
        RIGHT_CHEEK = 454

        FOREHEAD = 10
        CHIN = 152

        LEFT_JAW = 172
        RIGHT_JAW = 397

        # ----------------------------
        # Measurements
        # ----------------------------

        data["face_width"] = distance(

            landmarks[LEFT_CHEEK],

            landmarks[RIGHT_CHEEK]

        )

        data["face_height"] = distance(

            landmarks[FOREHEAD],

            landmarks[CHIN]

        )

        data["jaw_width"] = distance(

            landmarks[LEFT_JAW],

            landmarks[RIGHT_JAW]

        )

        data["face_ratio"] = (

            data["face_height"]

            /

            data["face_width"]

        )

        return data