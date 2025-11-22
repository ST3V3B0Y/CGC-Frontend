import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useLibrary } from "../context/UseLibrary";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import "../styles/UserDashboard.css";

export default function Dashboard() {
  const { library, loadingLibrary, removeGame } = useLibrary();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <NavBar/>

      {/* Background */}
      <motion.div
        className="dashboard-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div className="dashboard-bg-layer" />
      </motion.div>

      {/* Contenido */}
      <div className="dashboard-container">
        <h1 className="dashboard-title">Mi Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Panel Mis Juegos */}
          <Card className="dashboard-card col-span-2">
            <CardContent className="p-6">
              <h2 className="section-title">Mis Juegos</h2>

              {loadingLibrary ? (
                <p className="section-text">Cargando juegos...</p>
              ) : library.length === 0 ? (
                <p className="section-text">No tienes juegos en tu biblioteca aún.</p>
              ) : (
                <div className="games-grid">
                  {library.map((game) => (
                    <Card key={game._id} className="game-card">
                      <div>
                        <h3 className="game-title">{game.titulo}</h3>
                        <p className="game-category">{game.categoria}</p>
                      </div>

                      <Button
                        variant={"destructive"}
                        className="delete-btn"
                        onClick={() => removeGame(game._id)}
                      >
                        Eliminar
                      </Button>
                    </Card>
                  ))}
                </div>
              )}

              <Button className="add-btn" onClick={() => navigate("/games")}>
                  <Plus size={18} /> Agregar Juego
              </Button>
            </CardContent>
          </Card>

          {/* Panel Estadísticas */}
          <Card className="dashboard-card">
            <CardContent className="p-6">
              <h2 className="section-title">Estadísticas</h2>
              <p className="section-text">Próximamente podrás ver tu actividad y progreso.</p>
            </CardContent>
          </Card>

          {/* Panel Perfil */}
          <Card className="dashboard-card">
            <CardContent className="p-6">
              <h2 className="section-title">Perfil</h2>
              <p className="section-text">Configura tu cuenta y preferencias</p>
              <Button className="profile-btn" onClick={() => navigate("/profile")}>
                <p>Configurar perfil</p>
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
 