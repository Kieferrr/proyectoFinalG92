import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Publicar = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nombre: "",
        desc: "",
        precio: "",
        img: "",
        condition: "Nuevo"
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Producto publicado con éxito (Simulado)");
        navigate("/perfil");
    };

    return (
        <div className="container mt-5">
            <div className="col-10 col-md-8 mx-auto">
                <h2 className="text-center mb-4 text-light">Publicar un producto</h2>
                <div className="card p-4 shadow-sm">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label text-light">Nombre del Producto</label>
                            <input
                                type="text"
                                name="nombre"
                                className="form-control"
                                placeholder="Ej: iPhone 13 Pro Max"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-light">Descripción</label>
                            <textarea
                                name="desc"
                                className="form-control"
                                placeholder="Detalles del producto, estado, tiempo de uso..."
                                rows="3"
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label text-light">Precio ($)</label>
                                <input
                                    type="number"
                                    name="precio"
                                    className="form-control"
                                    placeholder="Ej: 500000"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label text-light">Condición</label>
                                <select
                                    name="condition"
                                    className="form-control"
                                    onChange={handleChange}
                                >
                                    <option value="Nuevo">Nuevo</option>
                                    <option value="Usado">Usado</option>
                                    <option value="Caja Abierta">Caja Abierta</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label text-light">Foto del producto</label>
                            <input
                                type="text"
                                name="img"
                                className="form-control"
                                placeholder="URL"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary flex-grow-1">Publicar Ahora</button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate("/perfil")}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Publicar;