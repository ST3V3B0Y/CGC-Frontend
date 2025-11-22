import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import axios from "axios";
import "../styles/Community.css"

interface Review {
  _id: string;
  comentario: string;
  calificacion: number;
  juegoId?: {
    titulo: string;
    genero?: string;
    plataforma?: string;
  };
  createdAt: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export default function Community() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_URL}/reviews`);
      setReviews(res.data);
    } catch (error) {
      console.error("Error al obtener reseñas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) return <p>Cargando reseñas...</p>;

  return (
    <div>
        <NavBar/>
        <div className="community-container">
        <h2 className="community-title">Comunidad de Jugadores</h2>

        {reviews.length === 0 ? (
            <p className="no-reviews">No existen reseñas aún.</p>
        ) : (
            <div className="reviews-list">
            {reviews.map((review) => (
                <div key={review._id} className="review-card">
                <div className="review-left">
                    <h3 className="review-game">
                    {review.juegoId?.titulo || "Juego desconocido"}
                    </h3>
                    <p className="review-comment">{review.comentario}</p>

                    <span className="review-date">
                    {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                </div>

                <div className="review-right">
                    <div className="review-rating">
                    ⭐ {review.calificacion}/5
                    </div>
                </div>
                </div>
            ))}
            </div>
        )}
        </div>
    </div>
  );
}
