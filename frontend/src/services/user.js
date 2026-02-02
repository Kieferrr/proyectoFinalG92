import axios from "axios";

const URL_BASE = "https://kieferstore-backend.onrender.com";

const loginUser = async (email, password) => {
    try {
        const response = await axios.post(URL_BASE + "/login", {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const registerUser = async (usuario) => {
    try {
        const response = await axios.post(URL_BASE + "/usuarios", usuario);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getProfile = async (token) => {
    try {
        const response = await axios.get(URL_BASE + "/usuarios", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { loginUser, registerUser, getProfile };