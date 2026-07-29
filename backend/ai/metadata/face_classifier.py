def classify_face(face):

    data = {}

    ratio = face["face_ratio"]

    jaw = face["jaw_width"] / face["face_width"]


    # ----------------------------
    # Face Shape
    # ----------------------------

    if ratio > 1.45:

        data["shape"] = "Oblong"

    elif ratio > 1.30:

        data["shape"] = "Oval"

    elif ratio > 1.15:

        if jaw > 0.88:

            data["shape"] = "Square"

        else:

            data["shape"] = "Rectangle"

    else:

        if jaw > 0.90:

            data["shape"] = "Round"

        else:

            data["shape"] = "Heart"


    # ----------------------------
    # Face Length
    # ----------------------------

    if ratio > 1.45:

        data["length"] = "Long"

    elif ratio > 1.20:

        data["length"] = "Medium"

    else:

        data["length"] = "Short"


    # ----------------------------
    # Jaw Type
    # ----------------------------

    if jaw > 0.90:

        data["jaw"] = "Strong"

    elif jaw > 0.82:

        data["jaw"] = "Balanced"

    else:

        data["jaw"] = "Soft"


    return data