import { useState } from "react";

const Registro = () => {
    const [usuario, setUsuario] = useState({
        nombre: "",
        email: "",
        password: "",
        avatar: "",
    });

    const handleSetUsuario = ({ target: { value, name } }) => {
        const field = {};
        field[name] = value;
        setUsuario({ ...usuario, ...field });
    };

    return (
        <div className="container mt-5">
            <div className="col-10 col-md-8 col-lg-6 mx-auto">
                <h2 className="text-center mb-4">Registrarme</h2>
                <div className="card p-4 shadow-sm">
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            className="form-control"
                            placeholder="Ingresa tu nombre"
                            onChange={handleSetUsuario}
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
                    <div className="mb-3">
                        <label className="form-label">Avatar URL</label>
                        <input
                            type="text"
                            name="avatar"
                            className="form-control"
                            placeholder="https://foto.com/perfil.jpg"
                            onChange={handleSetUsuario}
                        />
                    </div>
                    <button className="btn btn-warning w-100 mt-3">Registrarme</button>
                </div>
            </div>
        </div>
    );
};

export default Registro;