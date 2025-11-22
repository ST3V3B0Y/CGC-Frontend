import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReviewsByGame, createReview, deleteReview } from "../services/reviewService";
import { useAuth } from "../context/UseAuth";
import NavBar from "@/components/NavBar";
import "../styles/Reviews.css";

export interface ReviewUser {
  id: string;
  nombre: string;
  email: string;
  avatar?: string;
}

export interface Review {
  id: string;
  juegoId: string;
  usuario: ReviewUser;
  calificacion: number;
  comentario?: string;
  horasJugadas: number;
  dificultad: "Fácil" | "Normal" | "Difícil";
  createdAt: string;
  updatedAt: string;
}

export interface CreateReview {
  juegoId: string;
  calificacion: number;
  comentario?: string;
  horasJugadas: number;
  dificultad: "Fácil" | "Normal" | "Difícil";
}

export default function Reviews() {
  const { gameId } = useParams();
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<CreateReview>({
    juegoId: gameId || "",
    calificacion: 5,
    comentario: "",
    horasJugadas: 0,
    dificultad: "Normal",
  });

  // Obtener reseñas del juego
  useEffect(() => {
    if (!gameId) return;

    const fetchReviews = async () => {
      try {
        const data = await getReviewsByGame(gameId);
        setReviews(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error cargando reseñas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [gameId]);

  // Enviar reseña
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("Debes iniciar sesión para publicar una reseña");
      navigate("/login");
      return;
    }

    try {
      const newReview = await createReview(form, token);

      setReviews((prev) => [newReview, ...prev]);
      alert("Reseña agregada correctamente");
    } catch (error) {
      console.error("Error creando reseña:", error);
      alert("Error al agregar la reseña");
    }
  };

  // Eliminar reseña
  const handleDelete = async (id: string) => {
    if (!token) return;

    if (!confirm("¿Eliminar esta reseña?")) return;

    try {
      await deleteReview(id, token);
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Error eliminando reseña:", error);
      alert("No tienes permiso para eliminar esta reseña");
    }
  };

  if (loading) return <p className="loading">Cargando reseñas...</p>;

  return (
    <div>
      <NavBar />
      <div className="reviews-container">
        <h1 className="title">Reseñas del Juego</h1>

        <div className="reviews-list">
          {reviews.length === 0 && <p>No hay reseñas todavía.</p>}

          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <h3>⭐ {review.calificacion} / 5</h3>
                <p>{new Date(review.createdAt).toLocaleDateString()}</p>
              </div>

              <p className="review-user">Usuario: {review.usuario?.nombre ?? "Desconocido"}</p>

              <p><strong>Dificultad:</strong> {review.dificultad}</p>
              <p><strong>Horas jugadas:</strong> {review.horasJugadas}</p>

              {review.comentario && <p className="review-comment">{review.comentario}</p>}

              {(review.usuario?.id === user?.id || user?.rol === "admin") && (
                <button className="btn-delete" onClick={() => handleDelete(review.id)}>
                  Eliminar
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="review-form">
          <h2>Agregar Reseña</h2>

          <form onSubmit={handleSubmit}>
            <label>Calificación</label>
            <select
              value={form.calificacion}
              onChange={(e) => setForm({ ...form, calificacion: Number(e.target.value) })}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>

            <label>Dificultad</label>
            <select
              value={form.dificultad}
              onChange={(e) =>
                setForm({
                  ...form,
                  dificultad: e.target.value as CreateReview["dificultad"],
                })
              }
            >
              <option value="Fácil">Fácil</option>
              <option value="Normal">Normal</option>
              <option value="Difícil">Difícil</option>
            </select>

            <label>Horas jugadas</label>
            <input
              type="number"
              value={form.horasJugadas}
              onChange={(e) => setForm({ ...form, horasJugadas: Number(e.target.value) })}
            />

            <label>Comentario</label>
            <textarea
              value={form.comentario}
              onChange={(e) => setForm({ ...form, comentario: e.target.value })}
            />

            <button type="submit" className="btn-add">Publicar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
