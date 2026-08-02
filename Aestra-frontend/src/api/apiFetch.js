import { refresh } from "./auth";

const BASE_URL = "https://fabulous-eagerness-production.up.railway.app";

export async function apiFetch(endpoint, options = {}) {

    let response = await fetch(

        `${BASE_URL}${endpoint}`,

        {

            ...options,

            credentials: "include"

        }

    );

    // Access token expired
    if (response.status === 401) {

        const refreshResponse = await refresh();

        if (!refreshResponse.success) {

            console.log("Refresh failed");


            return refreshResponse;

        }

        // Retry original request
        response = await fetch(

            `${BASE_URL}${endpoint}`,

            {

                ...options,

                credentials: "include"

            }

        );

    }

    return await response.json();

}