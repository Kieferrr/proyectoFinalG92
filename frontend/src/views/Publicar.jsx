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
        <div className="container mt-5">
            <div className="col-10 col-md-8 col-lg-6 mx-auto">
                <h2 className="text-center mb-4">Publicar Producto</h2>
                <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                    <div className="mb-3">
                        <label className="form-label">Nombre del Producto</label>
                        <input type="text" name="nombre" className="form-control" placeholder="Ingresa el nombre" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descripción</label>
                        <textarea name="descripcion" className="form-control" placeholder="Escribe una descripción" onChange={handleChange} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Precio</label>
                        <input type="number" name="precio" className="form-control" placeholder="Ej: 50000" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">URL de la Imagen</label>
                        <input type="text" name="img" className="form-control" placeholder="URL" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Condición</label>
                        <select name="condicion" className="form-select" onChange={handleChange}>
                            <option value="Nuevo">Nuevo</option>
                            <option value="Usado">Usado</option>
                            <option value="Caja Abierta">Caja Abierta</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3">Publicar ahora</button>
                </form>
            </div>
        </div>
    );
};

export default Publicar;