import { apiFetch } from "./apiFetch";

const BASE_URL = "/api/auth";

export async function signup(userData) {

    return await apiFetch(

        `${BASE_URL}/signup`,

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(userData)

        }

    );

}

export async function login(userData) {

    return await apiFetch(

        `${BASE_URL}/login`,

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(userData)

        }

    );

}

export async function logout() {

    return await apiFetch(

        `${BASE_URL}/logout`,

        {

            method: "POST"

        }

    );

}

export async function refresh() {

    const response = await fetch(

        "https://fabulous-eagerness-production.up.railway.app/api/auth/refresh",

        {

            method: "POST",

            credentials: "include"

        }

    );

    return await response.json();

}