import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useLibrary } from "../context/UseLibrary";
import NavBar from "@/components/NavBar";
import { Link } from "react-router-dom";
import "../styles/UserDashboard.css"

export default function Dashboard() {
  const { library, loadingLibrary, removeGame } = useLibrary();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <NavBar/>

      {/* Animated Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at center, rgba(255, 255, 0, 0.7), rgba(0,0,0,0.9))",
              "radial-gradient(circle at center, rgba(0, 119, 255, 0.7), rgba(0,0,0,0.9))",
              "radial-gradient(circle at center, rgba(255, 0, 0, 0.7), rgba(0,0,0,0.9))",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 p-8 text-white">
        <h1 className="text-4xl font-bold mb-6">Mi Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 rounded-2xl shadow-xl col-span-2">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Mis Juegos</h2>

              {loadingLibrary ? (
                <p className="opacity-70">Cargando juegos...</p>
              ) : library.length === 0 ? (
                <p className="opacity-70">No tienes juegos en tu biblioteca aún.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {library.map((game) => (
                    <Card key={game._id} className="bg-black/30 border-white/10 rounded-xl p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">{game.titulo}</h3>
                        <p className="text-sm opacity-60">{game.categoria}</p>
                      </div>
                      <Button
                        variant="destructive"
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => removeGame(game._id)}
                      >
                        Eliminar
                      </Button>
                    </Card>
                  ))}
                </div>
              )}

              <Button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white rounded-xl mt-6">
                <Link to="/games"><Plus size={18} /> Agregar Juego </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-xl border-white/10 rounded-2xl shadow-xl">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Estadísticas</h2>
              <p className="text-sm opacity-70">Próximamente podrás ver tu actividad y progreso.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-xl border-white/10 rounded-2xl shadow-xl">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Perfil</h2>
              <p className="text-sm opacity-70">Configura tu cuenta y preferencias</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
