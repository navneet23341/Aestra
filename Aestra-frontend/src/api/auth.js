const BASE_URL = "http://localhost:3000/api/auth";

export async function signup(userData) {

    const response = await fetch(`${BASE_URL}/signup`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        credentials: "include",

        body: JSON.stringify(userData)

    });

    return response.json();

}

export async function login(userData) {

    const response = await fetch(`${BASE_URL}/login`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        credentials: "include",

        body: JSON.stringify(userData)

    });

    return response.json();

}