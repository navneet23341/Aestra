from PIL import Image


def preprocess_image(input_path, output_path):

    image = Image.open(input_path)

    # Convert to RGB if needed
    if image.mode != "RGB":
        image = image.convert("RGB")

    # Resize while keeping aspect ratio
    image.thumbnail((1024, 1024))

    image.save(

        output_path,

        format="JPEG",

        quality=95

    )

    return output_path