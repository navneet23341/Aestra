import mediapipe as mp

mp_face = mp.solutions.face_mesh


def extract_glasses(rgb):

    with mp_face.FaceMesh(
        static_image_mode=True,
        max_num_faces=1
    ) as mesh:

        result = mesh.process(rgb)

        if not result.multi_face_landmarks:

            return {
                "detected": False
            }

        # Placeholder for now.
        # We'll later replace this with an OpenCV/ML detector.

        return {

            "detected": False,

            "confidence": 0.0

        }