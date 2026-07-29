def classify_body(body):

    result = {}

    ratio = body["shoulder_hip_ratio"]

    if ratio > 1.20:

        result["body_shape"] = "Inverted Triangle"

    elif ratio > 1.05:

        result["body_shape"] = "Athletic"

    elif ratio >= 0.95:

        result["body_shape"] = "Rectangle"

    else:

        result["body_shape"] = "Pear"



    if body["torso_leg_ratio"] < 0.55:

        result["leg_type"] = "Long Legs"

    elif body["torso_leg_ratio"] < 0.70:

        result["leg_type"] = "Balanced"

    else:

        result["leg_type"] = "Short Legs"



    if body["shoulder_width"] > 0.42:

        result["shoulder_type"] = "Broad"

    elif body["shoulder_width"] > 0.34:

        result["shoulder_type"] = "Average"

    else:

        result["shoulder_type"] = "Narrow"



    return result