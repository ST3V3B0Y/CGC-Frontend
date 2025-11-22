import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UseAuth";
import "../styles/Login.css";

const Login: React.FC = () => {
  const { login, user } = useAuth();
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
        await login(correo, contraseña);
        alert("✅ Inicio de sesión exitoso");
        if (user?.rol === "admin") {
          navigate("/admin-panel");
        } else {
          navigate("/dashboard");
        }
  
      } catch (err) {
      setError((err as Error).message = "❌ Correo o contraseña incorrecto")
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <button className="back-button" onClick={() => navigate("/games")}>
        ← Regresar
      </button>
  
      <form onSubmit={handleSubmit} className="login-card">
  
        <h2 className="login-title">Iniciar Sesión</h2>
  
        {error && <div className="login-error">{error}</div>}
  
        <div className="mb-4">
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="login-input"
          />
        </div>
  
        <div className="mb-4">
          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className="login-input"
          />
        </div>
  
        <button type="submit" disabled={loading} className="login-button">
          {loading ? "Ingresando..." : "Entrar"}
        </button>
  
      </form>
  
      <Link to="/register" className="login-link">
        ¿Aún no tienes cuenta? Regístrate
      </Link>
  
    </div>
  );
};

export default Login;
