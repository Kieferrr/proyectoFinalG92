import { useContext, useState, useEffect } from "react";
import { MyContext } from "../context/MyContext";
import Gallery from "../components/Gallery";

const Home = () => {
    const { data } = useContext(MyContext);

    const [condicionSeleccionada, setCondicionSeleccionada] = useState("Todos");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(2000000);
    const [productosFiltrados, setProductosFiltrados] = useState([]);

    useEffect(() => {
        const filtrados = data.filter(p => {
            const cumpleCondicion = condicionSeleccionada === "Todos" || p.condition === condicionSeleccionada;
            const cumplePrecio = p.price >= minPrice && p.price <= maxPrice;
            return cumpleCondicion && cumplePrecio;
        });
        setProductosFiltrados(filtrados);
    }, [data, condicionSeleccionada, minPrice, maxPrice]);

    const handleMinChange = (e) => {
        const val = Math.min(Number(e.target.value), maxPrice - 10000);
        setMinPrice(val);
    };

    const handleMaxChange = (e) => {
        const val = Math.max(Number(e.target.value), minPrice + 10000);
        setMaxPrice(val);
    };

    const minPos = (minPrice / 2000000) * 100;
    const maxPos = (maxPrice / 2000000) * 100;

    const destacados = data.slice(0, 6);
    const nuevos = data.filter((p) => p.condition === "Nuevo");
    const usados = data.filter((p) => p.condition === "Usado");
    const cajaAbierta = data.filter((p) => p.condition === "Caja Abierta");

    return (
        <>
            <div className="hero-banner"></div>

            <div className="container-fluid px-5 mt-5">
                <div className="row">

                    <div className="col-lg-2 col-md-3 mb-4">
                        <div className="filter-sidebar sticky-top" style={{ top: '90px', zIndex: 1, fontSize: '0.9rem' }}>
                            <h5 className="mb-4">Filtros</h5>

                            <div className="mb-4">
                                <h6 className="text-secondary small text-uppercase fw-bold mb-3">Condición</h6>
                                {['Todos', 'Nuevo', 'Usado', 'Caja Abierta'].map((cond) => (
                                    <div className="form-check mb-2" key={cond}>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="condicion"
                                            id={cond}
                                            checked={condicionSeleccionada === cond}
                                            onChange={() => setCondicionSeleccionada(cond)}
                                        />
                                        <label className="form-check-label" htmlFor={cond}>
                                            {cond}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <hr className="border-secondary my-4" />

                            <div className="mb-3">
                                <h6 className="text-secondary small text-uppercase fw-bold mb-3">Precio</h6>
                                <div className="d-flex justify-content-between text-light small mb-2">
                                    <span>${minPrice.toLocaleString("es-CL")}</span>
                                    <span>${maxPrice.toLocaleString("es-CL")}</span>
                                </div>

                                <div className="slider-container">
                                    <div className="slider-track"></div>
                                    <div
                                        className="slider-range"
                                        style={{ left: `${minPos}%`, width: `${maxPos - minPos}%` }}
                                    ></div>

                                    <input
                                        type="range"
                                        min="0" max="2000000" step="10000"
                                        value={minPrice}
                                        onChange={handleMinChange}
                                        className="multi-range-input"
                                    />
                                    <input
                                        type="range"
                                        min="0" max="2000000" step="10000"
                                        value={maxPrice}
                                        onChange={handleMaxChange}
                                        className="multi-range-input"
                                    />

                                    <div className="thumb" style={{ left: `${minPos}%` }}></div>
                                    <div className="thumb" style={{ left: `${maxPos}%` }}></div>
                                </div>
                            </div>

                            <button
                                className="btn btn-outline-light btn-sm w-100 mt-4"
                                onClick={() => {
                                    setCondicionSeleccionada("Todos");
                                    setMinPrice(0);
                                    setMaxPrice(2000000);
                                }}
                            >
                                Limpiar Filtros
                            </button>
                        </div>
                    </div>

                    <div className="col-lg-10 col-md-9">

                        {condicionSeleccionada === "Todos" && minPrice === 0 && maxPrice === 2000000 ? (
                            <>
                                <h4 className="mb-3 text-light fw-bold">Destacados</h4>
                                <Gallery items={destacados} />

                                <h4 className="mb-3 text-light fw-bold">Productos Nuevos</h4>
                                <Gallery items={nuevos} />

                                <h4 className="mb-3 text-light fw-bold">Productos Usados</h4>
                                <Gallery items={usados} />

                                <h4 className="mb-3 text-light fw-bold">Productos con Caja abierta</h4>
                                <Gallery items={cajaAbierta} />
                            </>
                        ) : (
                            <>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="text-light fw-bold">Resultados</h4>
                                    <span className="badge border border-secondary text-light">
                                        {productosFiltrados.length} productos
                                    </span>
                                </div>

                                {productosFiltrados.length > 0 ? (
                                    <Gallery items={productosFiltrados} />
                                ) : (
                                    <div className="text-center py-5">
                                        <h3 className="text-light opacity-50">Sin resultados 🕵️‍♂️</h3>
                                        <p className="text-light mt-3">Prueba ampliando el rango de precios.</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
};

export default Home;