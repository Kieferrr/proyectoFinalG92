import { NavLink } from "react-router-dom";

const Navbar = () => {
    const setActiveClass = ({ isActive }) => (isActive ? "active" : undefined);

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

                    <NavLink className={setActiveClass} to="/registro">
                        Registrarse
                    </NavLink>

                    <NavLink className={setActiveClass} to="/login">
                        Iniciar Sesión
                    </NavLink>

                    <NavLink className={setActiveClass} to="/perfil">
                        Mi Perfil
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;