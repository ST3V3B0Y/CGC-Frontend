import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../context/UseAuth";

export const register: React.FC = () => {
    const { RegisterData } = useAuth();
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await RegisterData(nombre, correo, contraseña);
            alert("✅ Registro exitoso");
            navigate("/login");
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div>
                <Link to="/games" className="underline-offset ml-4 mt-4 inline-block">
                    Regresar
                </Link>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>Registrarse</h2>
                    {error && <div>{error}</div>}
                    <div>
                        <label>Nombre</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Correo</label>
                        <input
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Contraseña</label>
                        <input  
                            type="password"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Registrando..." : "Registrarse"}
                    </button>
                </form>
            </div>
        </div>
    );
};