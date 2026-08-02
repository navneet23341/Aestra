import { motion } from "motion/react";
import "./AuthModal.css";
import { useState , useEffect} from "react";
import { signup, login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthModal({ closeAuth }) {
    const [screen, setScreen] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [image, setImage] = useState(null);
    const {setUser} = useAuth();
    const [createdUser, setCreatedUser] = useState(null);
    const navigate = useNavigate();



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


    const handleSignup = async () => {

        try {

            const response = await signup({
                fullName: name,
                email,
                password
            });
            if (!response.success) {

                alert(response.message);

                return false;

            }

            setCreatedUser(response.user);
            return true;

        } catch (error) {

            console.error(error);

            return false;

        }

    }

    const handleLogin = async () => {

        try {

            const response = await login({

                email,

                password

            });

            if (!response.success) {

                alert(response.message);

                return false;

            }

            setUser(response.user);      
          return true;

        }

        catch(error){

            console.error(error);

            return false;

        }

    }

    const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {

        alert("Please upload an image.");

        return;

    }

    if (image) {

        URL.revokeObjectURL(image.preview);

    }

    setImage({

        file,

        preview: URL.createObjectURL(file)

    });

    };

    useEffect(() => {

    return () => {

        if (image) {

            URL.revokeObjectURL(image.preview);

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


                <h2>

                    {

                        screen === "login"

                        ? "Welcome Back"

                        : screen === "signup"

                        ? "Join Mirror"

                        : "Upload Your Photo"

                    }

                </h2>

                <p>
                    {screen === "login"
                        ? "Sign in to continue styling with Mirror."
                        : "Create your account and start styling."}
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

                    <>

                        <button
                            className="back-btn"
                            onClick={() => {

                                if(image){

                                    URL.revokeObjectURL(image.preview);

                                }

                                setImage(null);

                                setScreen("signup");

                            }}
                        >

                            ← Back

                        </button>

                        <div className="upload-section">

                            <label
                                htmlFor="photo-upload"
                                className="upload-box"
                            >

                                {

                                    image ?

                                    <motion.img

                                        src={image.preview}

                                        className="preview-image"

                                        initial={{

                                            opacity:0,

                                            scale:.8

                                        }}

                                        animate={{

                                            opacity:1,

                                            scale:1

                                        }}

                                    />

                                    :

                                    <div className="camera-icon">

                                        📷

                                    </div>

                                }

                                <h3>

                                    {

                                        image ?

                                        "Photo Ready"

                                        :

                                        "Upload Your Photo"

                                    }

                                </h3>

                                <p>

                                    {

                                        image ?

                                        "Looks great!"

                                        :

                                        "Choose a clear full-body image."

                                    }

                                </p>

                                <span className="upload-btn">

                                    {

                                        image ?

                                        "Replace Photo"

                                        :

                                        "Browse Files"

                                    }

                                </span>

                            </label>

                            <input

                                id="photo-upload"

                                type="file"

                                accept="image/*"

                                onChange={handleImage}

                            />

                        </div>

                        <button

                            className="submit-button"

                            disabled={!image}

                            onClick={async () => {
                                const formData = new FormData();

                                formData.append("image", image.file);

                                const response = await fetch(

                                    "https://fabulous-eagerness-production.up.railway.app/user/profile-photo",

                                    {

                                        method: "POST",

                                        credentials: "include",

                                        body: formData

                                    }

                                );

                                const data = await response.json();

                                if (!data.success) {

                                    alert("Failed to upload image.");

                                    return;

                                }

                                setUser(createdUser)
                                closeAuth();
                                navigate("/home");

                            }}

                        >

                            Continue

                        </button>

                    </>

                )}
                {screen !== "upload" && (    
                <button

                    className="submit-button"

                    disabled={
                        screen === "login"
                            ? !loginValid
                            : !signupValid
                    }

                    onClick={async() => {

                        if (screen === "login") {

                            const success = await handleLogin();

                            if (success) {

                                closeAuth();

                                navigate("/home");

                            }

                        }

                        else if (screen === "signup") {

                            const success = await handleSignup();

                            if (success) {

                                setScreen("upload");

                            }

                        }

                    }}

                >

                    {screen === "login"
                        ? "Continue"
                        : "Create Account"}

                </button>
                )}
                
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