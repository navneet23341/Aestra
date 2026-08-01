import os
import json
import base64
import requests
from dotenv import load_dotenv
from prompt import build_avatar_prompt

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")

API_URL = "https://openrouter.ai/api/v1/images"


def generate_avatar(image_path, output_path):

    with open(image_path, "rb") as f:
        image_b64 = base64.b64encode(f.read()).decode("utf-8")

    payload = {
        "model": "bytedance-seed/seedream-4.5",
        "prompt": build_avatar_prompt(),

        # image edit input
        "image": f"data:image/jpeg;base64,{image_b64}",

        "resolution": "2K",
        "aspect_ratio": "2:3"
    }

    response = requests.post(
        API_URL,
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
        },
        data=json.dumps(payload),
    )

    print(response.status_code)
    print(response.text)

    response.raise_for_status()

    result = response.json()

    image = result["data"][0]

    with open(output_path, "wb") as f:
        f.write(base64.b64decode(image["b64_json"]))

    print("Avatar saved:", output_path)


if __name__ == "__main__":

    generate_avatar(
        "avatar/input.jpeg",
        "avatar_seedream.png",
    )