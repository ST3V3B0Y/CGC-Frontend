import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UseAuth";
import "../styles/NavBar.css";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    sessionStorage.removeItem("Token");
    alert("✅ Sesión cerrada exitosamente");
    navigate("/games");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/home">
          <img src="../assets/CGCLogoCol.png" alt="CGCLogo" />
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/games">Explorar</Link>
        <Link to="/reviews">Comunidad</Link>

        {user ? (
          <>
            <Link to="/dashboard">Biblioteca</Link>
            <Link to="/profile" className="navbar-username">
              {user.nombre}
            </Link>

            <button className="logout-btn" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <div className="navbar-auth">
            <Link to="/login">Iniciar sesión</Link>
            <Link to="/register">Registrarse</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
