import React, { useState } from "react";
import { useAuth } from "../context/UseAuth";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css"

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await register(nombre, correo, contraseña);
      navigate("/dashboard");
    } catch (err) {
      setError((err as Error).message = "❌ Error al registrar usuario")
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <button className="back-button" onClick={() => navigate("/games")}>
        ← Regresar
      </button>
      <form onSubmit={handleSubmit} className="register-card">

        <h2 className="register-title">Crear Cuenta</h2>

        {error && <div className="register-error">{error}</div>}

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="register-input"
          required
        />

        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="register-input"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          className="register-input"
          required
        />

        <button type="submit" className="register-button">
          Registrarse
        </button>
      </form>
    </div>
  );
}