import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { loginUser, registerUser } from "../services/user";

export const MyContext = createContext();

const MyProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [token, setToken] = useState(null);

    const fetchProductos = async () => {
        try {
            const response = await axios.get("https://kieferstore-backend.onrender.com/productos");
            const normalizados = response.data.map(p => ({
                ...p,
                id: p.id.toString(),
                name: p.nombre,
                price: p.precio,
                condition: p.condicion,
                desc: p.descripcion
            }));
            setData(normalizados);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    const login = async (email, password) => {
        try {
            const tokenRecibido = await loginUser(email, password);
            setToken(tokenRecibido);
        } catch (error) {
            throw error;
        }
    };

    const register = async (usuario) => {
        try {
            const data = await registerUser(usuario);
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <MyContext.Provider value={{ data, setData, token, setToken, login, logout, register, fetchProductos }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyProvider;