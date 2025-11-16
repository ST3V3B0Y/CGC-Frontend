import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  const [stage, setStage] = useState<"intro" | "rings" | "loading">("intro");
  const navigate = useNavigate();

  const handleStart = () => {
    setStage("rings");
  };

  // ANIMACIÓN AROS 
  useEffect(() => {
    if (stage === "rings") {
      const timer = setTimeout(() => setStage("loading"), 3000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // PANTALLA DE CARGA
  useEffect(() => {
    if (stage === "loading") {
      const timer = setTimeout(() => navigate("/games"), 1000);
      return () => clearTimeout(timer);
    }
  }, [stage, navigate]);

  return (
    <div className="home-container">
      {/* HOME */}
      <h1 className="home-title">Bienvenido a <span className="C">C</span><span className="o">o</span><span className="l">l</span>GameCloud</h1>
      <button className={`start-button ${stage !== "intro" ? "stop-blink" : ""}`} onClick={handleStart}>
        <p>
          START
        </p>
      </button>

      {/* ANIMACIÓN AROS  */}
      <div className={`rings ${stage === "rings" ? "active" : ""}`}>
        <div className="ring ring-yellow"></div>
        <div className="ring ring-red"></div>
        <div className="ring ring-blue"></div>
      </div>

      {/* PANTALLA DE CARGA */}
      {stage === "loading" && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Cargando tu experiencia...</p>
        </div>
      )}
    </div>
  );
}
