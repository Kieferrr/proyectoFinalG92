import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { MyContext } from "../context/MyContext";

const Publicar = () => {
    const navigate = useNavigate();
    const { token, fetchProductos } = useContext(MyContext);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productoFinal = {
                nombre: form.nombre,
                descripcion: form.desc,
                precio: form.precio,
                img: form.img,
                stock: 1,
                condicion: form.condition
            };

            await axios.post("https://kieferstore-backend.onrender.com/productos", productoFinal, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success("¡Producto publicado con éxito!");
            await fetchProductos();
            navigate("/perfil");
        } catch (error) {
            toast.error("Error al publicar el producto");
        }
    };

    return (
        <div className="container mt-5">
            <div className="col-10 col-md-8 mx-auto">
                <h2 className="text-center mb-4 text-light">Publicar un producto</h2>
                <div className="card p-4 shadow-sm">
                    {/* Añadimos autoComplete="off" al formulario completo por seguridad */}
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="mb-3">
                            <label className="form-label text-light">Nombre del Producto</label>
                            <input
                                type="text"
                                name="nombre"
                                className="form-control"
                                placeholder="Ej: iPhone 13 Pro Max"
                                onChange={handleChange}
                                value={form.nombre}
                                autoComplete="off" // Evita sugerencias de nombres anteriores
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
                                value={form.desc}
                                autoComplete="off"
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
                                    value={form.precio}
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label text-light">Condición</label>
                                <select
                                    name="condition"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={form.condition}
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
                                value={form.img}
                                autoComplete="off" // Evita que salgan URLs de fotos antiguas
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