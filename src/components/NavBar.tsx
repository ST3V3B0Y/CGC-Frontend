import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-semibold">
        <Link to="/">MiApp</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/home" className="hover:underline">
          Inicio
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
          <Link to="/login" className="hover:underline">
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
