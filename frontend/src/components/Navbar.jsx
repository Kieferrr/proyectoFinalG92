import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../context/MyContext";

const Navbar = () => {
    const setActiveClass = ({ isActive }) => (isActive ? "active" : undefined);
    const { token, logout } = useContext(MyContext);

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <NavLink className={setActiveClass} to="/">
                    <span className="navbar-brand mb-0 h1">Marketplace</span>
                </NavLink>

                <div className="d-flex gap-3">
                    <NavLink className={setActiveClass} to="/">
                        Home
                    </NavLink>

                    {token ? (
                        <>
                            <NavLink className={setActiveClass} to="/perfil">
                                Mi Perfil
                            </NavLink>
                            <button onClick={logout} className="btn btn-danger btn-sm">
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink className={setActiveClass} to="/registro">
                                Registrarse
                            </NavLink>
                            <NavLink className={setActiveClass} to="/login">
                                Iniciar Sesión
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;