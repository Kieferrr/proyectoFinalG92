import axios from "axios";

const URL_BASE = "https://kieferstore-backend.onrender.com";

const loginUser = async (email, password) => {
    const response = await axios.post(`${URL_BASE}/login`, { email, password });
    return response.data;
};

const registerUser = async (usuario) => {
    const response = await axios.post(`${URL_BASE}/usuarios`, usuario);
    return response.data;
};

const getProfile = async (token) => {
    const response = await axios.get(`${URL_BASE}/usuarios`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export { loginUser, registerUser, getProfile };