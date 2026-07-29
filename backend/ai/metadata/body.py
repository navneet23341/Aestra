import math
import mediapipe as mp

mp_pose = mp.solutions.pose


def distance(a, b):

    return math.sqrt(

        (a.x - b.x) ** 2 +

        (a.y - b.y) ** 2

    )


def extract_body(rgb):

    data = {}

    with mp_pose.Pose(
        static_image_mode=True
    ) as pose:

        result = pose.process(rgb)

        if not result.pose_landmarks:

            data["detected"] = False

            return data

        landmarks = result.pose_landmarks.landmark

        # ----------------------------
        # Important Landmarks
        # ----------------------------

        left_shoulder = landmarks[11]
        right_shoulder = landmarks[12]

        left_hip = landmarks[23]
        right_hip = landmarks[24]

        left_knee = landmarks[25]
        right_knee = landmarks[26]

        left_ankle = landmarks[27]
        right_ankle = landmarks[28]

        data["detected"] = True

        # ----------------------------
        # Basic Measurements
        # ----------------------------

        data["shoulder_width"] = distance(
            left_shoulder,
            right_shoulder
        )

        data["hip_width"] = distance(
            left_hip,
            right_hip
        )

        # ----------------------------
        # Torso Length
        # ----------------------------

        shoulder_center_x = (
            left_shoulder.x + right_shoulder.x
        ) / 2

        shoulder_center_y = (
            left_shoulder.y + right_shoulder.y
        ) / 2

        hip_center_x = (
            left_hip.x + right_hip.x
        ) / 2

        hip_center_y = (
            left_hip.y + right_hip.y
        ) / 2

        data["torso_length"] = math.sqrt(

            (shoulder_center_x - hip_center_x) ** 2 +

            (shoulder_center_y - hip_center_y) ** 2

        )

        # ----------------------------
        # Leg Length
        # ----------------------------

        left_leg = distance(
            left_hip,
            left_ankle
        )

        right_leg = distance(
            right_hip,
            right_ankle
        )

        data["leg_length"] = (

            left_leg + right_leg

        ) / 2

        # ----------------------------
        # Ratios
        # ----------------------------

        data["shoulder_hip_ratio"] = (

            data["shoulder_width"]

            /

            data["hip_width"]

        )

        data["torso_leg_ratio"] = (

            data["torso_length"]

            /

            data["leg_length"]

        )

        return data