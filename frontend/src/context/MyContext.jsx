import { createContext, useState, useEffect } from "react";
import productosData from "../assets/productos.json";

export const MyContext = createContext();

const MyProvider = ({ children }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(productosData);
    }, []);

    return (
        <MyContext.Provider value={{ data, setData }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyProvider;