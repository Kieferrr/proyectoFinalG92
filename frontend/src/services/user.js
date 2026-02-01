// const URL_BASE = "http://localhost:3000";
const URL_BASE = "https://kieferstore-backend.onrender.com";

export const registerUser = async (email, password, rol, lenguage, nombre) => {
    try {
        const response = await fetch(`${URL_BASE}/usuarios`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, rol, lenguage, nombre }),
        });

        if (!response.ok) throw new Error("Error al registrar usuario");
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${URL_BASE}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Email o contraseña incorrectos");
        }

        const data = await response.text();
        return data;
    } catch (error) {
        throw error;
    }
};

export const getProfile = async (token) => {
    try {
        const response = await fetch(`${URL_BASE}/usuarios`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) throw new Error("No autorizado");

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};