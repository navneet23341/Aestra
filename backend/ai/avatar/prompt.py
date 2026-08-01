def build_avatar_prompt(metadata=None):

    prompt = """
The uploaded image is ONLY an identity reference.

Do NOT recreate the original clothing.

Do NOT recreate the original background.

Do NOT recreate the original pose.

Generate a new professional studio portrait.

Fashion catalog photo.

Full body shot.

Standing pose.

Centered composition.

Camera positioned far enough to capture the entire body.

Head and feet fully visible.

85mm lens.

Eye-level camera.

Portrait orientation.

Do not crop the image.

Do not create a close-up.

Do not create a waist-up portrait.

Do not create a thigh-up portrait.

Always show the entire body from head to toe.

Requirements:

- Preserve the person's facial identity exactly.
- Preserve hairstyle, hair color, eyebrows, eyes, nose, lips and beard.
- Preserve the original skin tone.
- Generate a complete standing full-body portrait.

Pose:

- Standing naturally.
- Looking directly at the camera.
- Arms slightly away from the body.
- Hands relaxed.
- Feet shoulder-width apart.

Replace ALL existing clothing.

Do NOT preserve any clothing from the uploaded image.

Remove all existing garments completely.

Dress the person in a matte black athletic compression bodysuit.

The bodysuit must completely replace the original clothes.

No hoodie.

No shirt.

No jacket.

No jeans.

No logos.

No accessories.

Body:

- Realistic human anatomy.
- Natural head size.
- Balanced proportions.
- Slim athletic build.
- Professional fashion model proportions.
- Approximately 7.5 heads tall.

Scene:

- Clean light gray seamless studio background.
- Soft studio lighting.
- Fashion catalogue photography.
- Centered full-body framing.
- Entire body visible.

Style:

- Ultra realistic.
- Photorealistic.
- High detail.
- Fashion editorial quality.
- 8K quality.

Avoid:

- Cartoon
- Anime
- CGI
- Plastic skin
- Oversized head
- Tiny body
- Extra fingers
- Missing fingers
- Deformed hands
- Cropped legs
- Cropped feet
- Blurry
- Low quality
- Transparent clothing
- Skin-colored clothing
- Sexual pose
- Exaggerated muscles
"""

    if metadata:

        prompt += "\n\nUser attributes:\n"

        face = metadata.get("face", {})
        body = metadata.get("body", {})
        hair = metadata.get("hair_attributes", {})
        beard = metadata.get("beard_attributes", {})

        if face.get("attributes"):
            prompt += f"- Face Shape: {face['attributes'].get('shape')}\n"
            prompt += f"- Jaw: {face['attributes'].get('jaw')}\n"

        if body.get("attributes"):
            prompt += f"- Body Shape: {body['attributes'].get('body_shape')}\n"
            prompt += f"- Shoulder Type: {body['attributes'].get('shoulder_type')}\n"
            prompt += f"- Leg Type: {body['attributes'].get('leg_type')}\n"

        if hair:
            prompt += f"- Hair Color: {hair.get('color')}\n"

        if beard:
            prompt += f"- Beard: {'Present' if beard.get('present') else 'None'}\n"

    return prompt