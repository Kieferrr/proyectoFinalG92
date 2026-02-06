import { useContext, useState, useEffect, useRef } from "react";
import { MyContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";

const Buscador = () => {
    const { data } = useContext(MyContext);
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [resultados, setResultados] = useState([]);
    const [mostrar, setMostrar] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        if (query.trim() === "") {
            setResultados([]);
            setMostrar(false);
            return;
        }
        const filtrados = data
            .filter(p => (p.name || p.nombre).toLowerCase().includes(query.toLowerCase()))
            .slice(0, 6);

        setResultados(filtrados);
        setMostrar(true);
    }, [query, data]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setMostrar(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const irAProducto = (id) => {
        navigate(`/producto/${id}`);
        setMostrar(false);
        setQuery("");
    };

    return (
        <div className="position-relative d-none d-lg-block mx-auto" ref={searchRef} style={{ width: '100%', maxWidth: '400px' }}>
            <input
                type="text"
                className="form-control bg-transparent text-light border-secondary shadow-none"
                placeholder="Buscar productos..."
                style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontSize: '0.9rem',
                    borderRadius: '16px',
                    paddingLeft: '1.5rem'
                }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query && setMostrar(true)}
            />

            {mostrar && resultados.length > 0 && (
                <ul className="list-group position-absolute w-100 shadow-lg mt-2" style={{ zIndex: 1000, border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                    {resultados.map((p) => (
                        <li
                            key={p.id}
                            className="list-group-item list-group-item-action bg-dark text-light border-secondary d-flex justify-content-between align-items-center py-2"
                            style={{ cursor: 'pointer', fontSize: '0.85rem', backgroundColor: '#1a1a1a' }}
                            onClick={() => irAProducto(p.id)}
                        >
                            <span className="text-truncate" style={{ maxWidth: '250px' }}>{p.name || p.nombre}</span>
                            <span className="fw-bold text-primary small">${(p.price || p.precio).toLocaleString("es-CL")}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Buscador;