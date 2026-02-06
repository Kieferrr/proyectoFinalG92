import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import Buscador from "./Buscador";

const Navbar = () => {
    const setActiveClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");
    const { token, logout } = useContext(MyContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ backgroundColor: '#121212', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="container-fluid px-5">
                <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
                    <img src="/img/logo.png" alt="Logo" width="30" height="30" />
                    <span className="fw-bold">KieferStore</span>
                </NavLink>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <Buscador />

                    <div className="navbar-nav gap-3 align-items-center">
                        <NavLink className={setActiveClass} to="/">Home</NavLink>

                        {token ? (
                            <>
                                <NavLink className={setActiveClass} to="/perfil">Mi Perfil</NavLink>
                                <button
                                    onClick={logout}
                                    className="btn nav-link text-decoration-none border-0 bg-transparent"
                                >
                                    Salir
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink className={setActiveClass} to="/registro">Registrarse</NavLink>
                                <NavLink className={setActiveClass} to="/login">Ingresar</NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;