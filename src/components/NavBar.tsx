import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UseAuth";

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
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-semibold">
        <Link to="/games"><img src="#" alt="#" /></Link>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/games" className="hover:underline">
          Explorar
        </Link>
        <Link to="/reviews" className="hover:underline">
          Comunidad
        </Link>
        {user ? (
          <>
            <Link to="/dashboard" className="hover:underline">
              Mi Panel
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <div>
            <Link to="/login" className="hover:underline">
              Iniciar sesión
            </Link>
            <Link to="/register" className="hover:underline">
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
