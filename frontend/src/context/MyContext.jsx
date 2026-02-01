import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/user";
import productosData from "../assets/productos.json";

export const MyContext = createContext();

const MyProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [token, setToken] = useState(null);

    useEffect(() => {
        setData(productosData);
    }, []);

    const login = async (email, password) => {
        try {
            const tokenRecibido = await loginUser(email, password);
            setToken(tokenRecibido);
        } catch (error) {
            throw error;
        }
    };

    const register = async (email, password, rol, lenguage, nombre) => {
        try {
            await registerUser(email, password, rol, lenguage, nombre);
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <MyContext.Provider value={{ data, setData, token, setToken, login, logout, register }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyProvider;