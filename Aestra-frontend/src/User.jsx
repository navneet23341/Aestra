import { useRef, useState } from "react";
import "./User.css";

function User() {
    const imageRef = useRef(null);

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const [prompt, setPrompt] = useState("");
    const [style, setStyle] = useState("");

    const [loading, setLoading] = useState(false);

    const handleImageClick = () => {
        imageRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please upload a valid image.");
            return;
        }

        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            alert("Please upload an image.");
            return;
        }

        const formData = new FormData();

        formData.append("image", image);
        formData.append("prompt", prompt);
        formData.append("style", style);

        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:3000/user/find",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong.");
            }

            console.log(data);

            // later
            // setResult(data)

        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="box-1">
            <h1>Your Look</h1>

            <h2>AI Fashion Stylist</h2>

            <h3>
                Upload a photo and describe the outfit you're looking for.
            </h3>

            <input
                ref={imageRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
            />

            <button
                type="button"
                onClick={handleImageClick}
            >
                Upload Image
            </button>

            {/* {preview && (
                <img
                    src={preview}
                    alt="Preview"
                    className="preview-image"
                />
            )} */}

            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Optional: Describe your ideal outfit..."
            />

            <h3 className="feature-heading">
                Style Preference (Optional)
            </h3>

            <div className="style-buttons">
                <button
                    type="button"
                    onClick={() => setStyle("Trending")}
                >
                    Trending
                </button>

                <button
                    type="button"
                    onClick={() => setStyle("Modern")}
                >
                    Modern
                </button>

                <button
                    type="button"
                    onClick={() => setStyle("Classic")}
                >
                    Classic
                </button>

                <button
                    type="button"
                    onClick={() => setStyle("Minimal")}
                >
                    Minimal
                </button>

                <button
                    type="button"
                    onClick={() => setStyle("Streetwear")}
                >
                    Streetwear
                </button>
            </div>

            {/* {style && (
                <p>
                    Selected Style: <strong>{style}</strong>
                </p>
            )} */}

            <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? "Finding Outfit..." : "Find Outfit"}
            </button>
        </div>
    );
}

export default User;