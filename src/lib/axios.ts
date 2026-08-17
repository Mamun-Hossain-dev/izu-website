import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5008/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach the access token from the persisted auth store to every request.
axiosInstance.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            try {
                const raw = window.localStorage.getItem("izu-auth");
                if (raw) {
                    const { state } = JSON.parse(raw) as {
                        state?: { user?: { accessToken?: string } };
                    };
                    const token = state?.user?.accessToken;
                    if (token) config.headers.Authorization = `Bearer ${token}`;
                }
            } catch {
                // Ignore malformed or unavailable storage.
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);
