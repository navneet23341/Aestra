import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../api/apiFetch";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

    async function loadUser() {

        try {

            const response = await apiFetch("/api/auth/profile");

            if (response.success) {

                setUser(response.user);

            } else {

                setUser(null);

            }

        }

        catch (error) {

            console.error(error);

            setUser(null);

        }

        finally {

            setLoading(false);

        }

    }

    loadUser();

}, []);

    return (

        <AuthContext.Provider

            value={{

                user,

                setUser,

                loading

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}