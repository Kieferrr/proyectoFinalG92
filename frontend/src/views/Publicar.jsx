import { useState, useContext } from "react";
import { MyContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Publicar = () => {
    const { token, fetchProductos } = useContext(MyContext);
    const navigate = useNavigate();

    const [producto, setProducto] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        img: "",
        stock: 1,
        condicion: "Nuevo"
    });

    const handleChange = (e) => {
        setProducto({ ...producto, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://kieferstore-backend.onrender.com/productos", producto, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("¡Producto publicado con éxito!");
            await fetchProductos();
            navigate("/perfil");
        } catch (error) {
            toast.error("Error al publicar");
        }
    };

    return (
        <div className="container mt-5 px-5">
            <div className="col-lg-8 mx-auto">
                <h2 className="text-light fw-bold mb-4">Crear nueva publicación</h2>
                <form onSubmit={handleSubmit} className="card p-4 border-0 shadow-lg" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="row">
                        <div className="col-md-8 mb-3">
                            <label className="text-light opacity-75 small mb-2">Nombre del producto</label>
                            <input
                                type="text" name="nombre"
                                className="form-control bg-transparent text-light border-secondary"
                                placeholder="Ej: Teclado Mecánico RGB"
                                style={{ '--bs-border-opacity': '0.5' }}
                                onChange={handleChange} required
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="text-light opacity-75 small mb-2">Condición</label>
                            <select name="condicion" className="form-select bg-transparent text-light border-secondary" onChange={handleChange}>
                                <option className="bg-dark" value="Nuevo">Nuevo</option>
                                <option className="bg-dark" value="Usado">Usado</option>
                                <option className="bg-dark" value="Caja Abierta">Caja Abierta</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="text-light opacity-75 small mb-2">Descripción detallada</label>
                        <textarea
                            name="descripcion" rows="3"
                            className="form-control bg-transparent text-light border-secondary"
                            placeholder="Describe el estado y características..."
                            onChange={handleChange} required
                        ></textarea>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="text-light opacity-75 small mb-2">Precio ($ CLP)</label>
                            <input
                                type="number" name="precio"
                                className="form-control bg-transparent text-light border-secondary"
                                placeholder="50000"
                                onChange={handleChange} required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="text-light opacity-75 small mb-2">URL de la Imagen</label>
                            <input
                                type="text" name="img"
                                className="form-control bg-transparent text-light border-secondary"
                                placeholder="https://images.unsplash.com/..."
                                onChange={handleChange} required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary fw-bold py-2 mt-3 shadow">
                        Publicar Producto
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Publicar;