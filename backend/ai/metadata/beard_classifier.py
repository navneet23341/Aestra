def classify_beard(data):

    if not data["detected"]:

        return {

            "present": False,

            "density": "Unknown"

        }

    darkness = data["darkness"]

    if darkness < 70:

        density = "Heavy"

    elif darkness < 110:

        density = "Medium"

    elif darkness < 150:

        density = "Light"

    else:

        density = "None"

    return {

        "present": density != "None",

        "density": density

    }