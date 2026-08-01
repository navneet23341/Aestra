import os
import base64
import requests

from prompt import build_prompt


NVIDIA_API_KEY = os.getenv("NVIDIA_API_KEY")

API_URL = "YOUR_NVIDIA_ENDPOINT"


def generate_avatar(
    image_path,
    metadata,
    output_path
):

    with open(image_path, "rb") as f:

        image_b64 = base64.b64encode(

            f.read()

        ).decode()

    image = f"data:image/jpeg;base64,{image_b64}"

    headers = {

        "Authorization": f"Bearer {NVIDIA_API_KEY}",

        "Accept": "application/json",

        "Content-Type": "application/json"

    }

    payload = {

        "prompt": build_prompt(metadata),

        "image": image,

        "seed": 0

    }

    response = requests.post(

        API_URL,

        headers=headers,

        json=payload

    )

    response.raise_for_status()

    body = response.json()

    avatar = base64.b64decode(

        body["artifacts"][0]["base64"]

    )

    with open(output_path, "wb") as f:

        f.write(avatar)

    return output_path