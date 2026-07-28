import { motion } from "motion/react";
import "./AuthModal.css";
import { useState } from "react";
import { signup, login } from "../api/auth";

export default function AuthModal({ closeAuth }) {
    const [screen, setScreen] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");



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

            console.log(response);

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

            console.log(response);

            return true;

        }

        catch(error){

            console.error(error);

            return false;

        }

    }

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
                    {screen === "login"
                        ? "Welcome Back"
                        : "Join Mirror"}
                </h2>

                <p>
                    {screen === "login"
                        ? "Sign in to continue styling with Mirror."
                        : "Create your account and start styling."}
                </p>

                

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

                    
                             

                <button

                    className="submit-button"

                    disabled={
                        screen === "login"
                            ? !loginValid
                            : !signupValid
                    }

                    onClick={async() => {

                        const success =
                            screen === "signup"
                                ? await handleSignup()
                                : await handleLogin();

                        if(success){

                            console.log("Authentication Successful");

                            // Later we'll do:
                            // closeAuth();
                            // navigate("/workspace");

                        }

                    }}

                >

                    {screen === "login"
                        ? "Continue"
                        : "Create Account"}

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