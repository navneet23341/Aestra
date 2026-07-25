import { motion } from "motion/react";
import "./AuthModal.css";
import { useEffect, useState } from "react";

export default function AuthModal({ closeAuth }) {
    const [screen, setScreen] = useState("login");
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleImage = (e) => {

        const file = e.target.files[0];

        if(!file) return;

        if(!file.type.startsWith("image/")){

            alert("Please upload an image.");

            return;

        }

        if(image){
            URL.revokeObjectURL(image);
        }

        setImage(URL.createObjectURL(file));

    }

    const validEmail =
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(
        email.trim().toLowerCase()
        );

    const loginValid =
        validEmail &&
        password.trim() !== "";

    const signupValid =
        name.trim() !== "" &&
        validEmail &&
        password.trim() !== "" &&
        confirmPassword.trim() !== "" &&
        password === confirmPassword;

    useEffect(() => {

        return () => {

            if(image){
                URL.revokeObjectURL(image);
            }

        };

    }, [image]);

    return(

        <motion.div className="auth-overlay" onClick={closeAuth}>

            <motion.div

                className="auth-modal"
                onClick={(e) => e.stopPropagation()}

                initial={{
                    opacity:0,
                    scale:.9,
                    y:20
                }}

                animate={{
                    opacity:1,
                    scale:1,
                    y:0
                }}

                exit={{
                    opacity:0,
                    scale:.9,
                    y:20
                }}

                transition={{
                    duration:.35
                }}

            >

                <button
                    className="close-btn"
                    onClick={closeAuth}
                >
                    ×
                </button>

                {screen === "upload" && (
                    <button
                        className="back-btn"
                        
                        onClick={() => {
                            setImage(null);
                            setScreen("signup")}
                        }
                    >
                        ← Back
                    </button>
                )}

                <h2>
                    {screen === "login"
                        ? "Welcome Back"
                        : screen === "signup"
                        ? "Join Mirror"
                        : "Meet Your AI Stylist"}
                </h2>

                <p>
                    {screen === "login"
                        ? "Sign in to continue styling with Mirror."
                        : screen === "signup"
                        ? "Create your account and start styling."
                        : "Upload a clear full-body photo so Mirror can recommend outfits that suit you."
                    }
                </p>

                {screen !== "upload" && (

                    <div className="auth-form">

                        {screen === "signup" && (

                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />

                        )}

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        {email && !validEmail && (

                            <small className="error">

                                Enter a valid Gmail address.

                            </small>

                        )}

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />

                        {screen === "signup" && (
                            <>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e)=>setConfirmPassword(e.target.value)}
                            />
                            {confirmPassword &&
                                password !== confirmPassword && (

                                    <small className="error">

                                        Passwords do not match.

                                    </small>

                                )}
                            </>

                        )}

                    </div>

                    )}
                
                {screen === "upload" && (

                    <div className="upload-section">

                        <label
                            htmlFor="photo-upload"
                            className="upload-box"
                        >

                            {image ? (

                                <motion.img

                                    src={image}

                                    alt="Preview"

                                    className="preview-image"

                                    initial={{
                                        opacity: 0,
                                        scale: 0.8
                                    }}

                                    animate={{
                                        opacity: 1,
                                        scale: 1
                                    }}

                                    transition={{
                                        duration: 0.3
                                    }}

                                />

                            ) : (

                                <div className="camera-icon">
                                    📷
                                </div>

                            )}

                            <h3>

                                {image
                                    ? "Photo Ready"
                                    : "Upload Your Photo"}

                            </h3>

                            <p>

                                {image
                                    ? "Looks great! You can replace it anytime."
                                    : "Choose a clear full-body image."}

                            </p>

                            <span className="upload-btn">

                                {image
                                    ? "Replace Photo"
                                    : "Browse Files"}

                            </span>

                        </label>

                        <input

                            id="photo-upload"

                            type="file"

                            accept="image/*"

                            onChange={handleImage}

                        />

                    </div>

                )}

                <button

                    className="submit-button"

                    disabled={
                        screen === "login"
                            ? !loginValid
                            : screen === "signup"
                            ? !signupValid
                            : !image
                    }

                    onClick={() => {

                        if(screen === "signup"){

                            setScreen("upload");

                        }

                        else if(screen === "upload"){

                            console.log("Finish Signup");

                        }

                        else{

                            console.log("Login");

                        }

                    }}

                >

                    {screen === "login"

                        ? "Continue"

                        : screen === "signup"

                        ? "Create Account"

                        : "Finish"}

                </button>
                
                <div className="switch-auth">

                {screen === "login" ? (

                    <p>
                        New here?

                        <span onClick={() => setScreen("signup")}>
                            Sign Up
                        </span>
                    </p>

                ) : screen === "signup" ? (

                    <p>
                        Already have an account?

                        <span onClick={() => setScreen("login")}>
                            Log In
                        </span>
                    </p>

                ) : null}

                </div>
            </motion.div>

        </motion.div>

    );

}