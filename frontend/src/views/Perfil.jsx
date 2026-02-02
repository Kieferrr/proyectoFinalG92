import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProfile } from "../services/user";
import axios from "axios";

const Perfil = () => {
    const { token, logout, fetchProductos } = useContext(MyContext);
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);

    const fetchPerfil = async () => {
        try {
            const data = await getProfile(token);
            setUsuario(data);
        } catch (error) {
            toast.error("Sesión expirada");
            logout();
            navigate("/login");
        }
    };

    useEffect(() => {
        if (!token) { navigate("/login"); return; }
        fetchPerfil();
    }, [token]);

    const handleDelete = async (id) => {
        const confirm = window.confirm("¿Estás seguro de que quieres eliminar esta publicación?");
        if (confirm) {
            try {
                await axios.delete(`https://kieferstore-backend.onrender.com/productos/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success("Publicación eliminada correctamente");
                fetchPerfil(); // Recargar lista del perfil
                fetchProductos(); // Recargar lista global
            } catch (error) {
                toast.error("Error al eliminar");
            }
        }
    };

    if (!usuario) return <div className="text-center mt-5 text-light">Cargando perfil...</div>;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card p-4 text-center h-100" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div className="d-flex justify-content-center mb-3">
                            <img src={usuario.avatar || `https://ui-avatars.com/api/?name=${usuario.nombre}`} alt="Avatar" className="rounded-circle shadow" width="100" height="100" />
                        </div>
                        <h4 className="text-light fw-bold">{usuario.nombre}</h4>
                        <p className="text-light opacity-75 small">{usuario.email}</p>
                        <span className="badge bg-secondary mb-3">{usuario.rol}</span>
                        <div className="d-flex flex-column gap-3 w-100">
                            <button className="btn btn-outline-light py-2" onClick={() => navigate("/publicar")}>+ Crear Publicación</button>
                            <button className="btn btn-outline-secondary py-2" onClick={logout}>Cerrar Sesión</button>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <h3 className="mb-4 text-light fw-bold">Mis Publicaciones</h3>
                    <div className="card p-3" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                        {usuario.publicaciones && usuario.publicaciones.length > 0 ? (
                            usuario.publicaciones.map(p => (
                                <div key={p.id} className="d-flex align-items-center gap-3 p-3 border-bottom border-secondary position-relative">
                                    <button onClick={() => handleDelete(p.id)} className="btn btn-sm text-danger position-absolute top-0 end-0 m-2 border-0 fw-bold fs-5" title="Eliminar">&times;</button>
                                    <img src={p.img} alt="p" className="rounded" width="80" height="80" style={{ objectFit: 'cover' }} />
                                    <div className="flex-grow-1">
                                        <h5 className="mb-1 text-light">{p.nombre}</h5>
                                        <p className="mb-0 text-light opacity-50 small">ID: #{p.id}</p>
                                    </div>
                                    <div className="text-end me-4">
                                        <p className="mb-0 fw-bold text-primary fs-5">${(p.precio || 0).toLocaleString("es-CL")}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-5 text-secondary">No tienes publicaciones activas.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Perfil;