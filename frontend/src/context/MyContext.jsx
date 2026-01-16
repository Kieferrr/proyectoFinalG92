import { createContext, useState, useEffect } from "react";
import productosData from "../assets/productos.json";

export const MyContext = createContext();

const MyProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [token, setToken] = useState(false);

    useEffect(() => {
        setData(productosData);
    }, []);

    const login = () => {
        setToken(true);
    };

    const logout = () => {
        setToken(false);
    };

    return (
        <MyContext.Provider value={{ data, setData, token, login, logout }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyProvider;