import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import { toast } from "react-toastify";

const Login = () => {
    const { login } = useContext(MyContext);
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        email: "",
        password: "",
    });

    const handleSetUsuario = ({ target: { value, name } }) => {
        const field = {};
        field[name] = value;
        setUsuario({ ...usuario, ...field });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(usuario.email, usuario.password);
            toast.success("¡Bienvenido!");
            navigate("/perfil");
        } catch (error) {
            toast.error("Error: " + error.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="col-10 col-md-8 col-lg-6 mx-auto">
                <h2 className="text-center mb-4">Iniciar Sesión</h2>
                <form onSubmit={handleLogin} className="card p-4 shadow-sm">
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
                    <button type="submit" className="btn btn-primary w-100 mt-3">Ingresar</button>
                </form>
            </div>
        </div>
    );
};

export default Login;