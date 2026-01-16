import { useState, useContext } from "react";
import { MyContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [usuario, setUsuario] = useState({
        email: "",
        password: "",
    });

    const { login } = useContext(MyContext);
    const navigate = useNavigate();

    const handleSetUsuario = ({ target: { value, name } }) => {
        const field = {};
        field[name] = value;
        setUsuario({ ...usuario, ...field });
    };

    const iniciarSesion = () => {
        if (usuario.email !== "" && usuario.password !== "") {
            login();
            navigate("/");
        } else {
            alert("Completa los campos");
        }
    };

    return (
        <div className="container mt-5">
            <div className="col-10 col-md-8 col-lg-6 mx-auto">
                <h2 className="text-center mb-4">Iniciar Sesión</h2>
                <div className="card p-4 shadow-sm">
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="name@example.com"
                            onChange={handleSetUsuario}
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
                        />
                    </div>
                    <button onClick={iniciarSesion} className="btn btn-success w-100 mt-3">Iniciar Sesión</button>
                </div>
            </div>
        </div>
    );
};

export default Login;