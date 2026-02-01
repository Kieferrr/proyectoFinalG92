import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import { toast } from "react-toastify";

const Registro = () => {
    const { register } = useContext(MyContext);
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        nombre: "",
        email: "",
        password: "",
        rol: "usuario",
        avatar: "",
    });

    const handleSetUsuario = ({ target: { value, name } }) => {
        const field = {};
        field[name] = value;
        setUsuario({ ...usuario, ...field });
    };

    const handleRegistrar = async (e) => {
        e.preventDefault();
        try {
            await register(usuario);
            toast.success("¡Usuario registrado con éxito!");
            navigate("/login");
        } catch (error) {
            toast.error("Algo salió mal: " + error.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="col-10 col-md-8 col-lg-6 mx-auto">
                <h2 className="text-center mb-4">Registrarme</h2>
                <form onSubmit={handleRegistrar} className="card p-4 shadow-sm">
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            className="form-control"
                            placeholder="Ingresa tu nombre"
                            onChange={handleSetUsuario}
                            value={usuario.nombre}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="name@example.com"
                            onChange={handleSetUsuario}
                            value={usuario.email}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="******"
                            onChange={handleSetUsuario}
                            value={usuario.password}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Foto de perfil (Opcional)</label>
                        <input
                            type="text"
                            name="avatar"
                            className="form-control"
                            placeholder="URL"
                            onChange={handleSetUsuario}
                            value={usuario.avatar}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3">Registrarme</button>
                </form>
            </div>
        </div>
    );
};

export default Registro;