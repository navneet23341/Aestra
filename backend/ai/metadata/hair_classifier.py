def classify_hair(data):

    if not data["detected"]:

        return {

            "color": "Unknown",

            "tone": "Unknown"

        }

    r, g, b = data["rgb"]

    brightness = (r + g + b) / 3

    if brightness < 50:

        color = "Black"

    elif brightness < 90:

        color = "Dark Brown"

    elif brightness < 140:

        color = "Brown"

    elif brightness < 190:

        color = "Light Brown"

    elif brightness < 225:

        color = "Blonde"

    else:

        color = "Gray / White"

    if brightness < 85:

        tone = "Dark"

    elif brightness < 170:

        tone = "Medium"

    else:

        tone = "Light"

    return {

        "color": color,

        "tone": tone

    }