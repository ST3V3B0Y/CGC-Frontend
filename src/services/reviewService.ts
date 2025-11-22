import axios from "axios";
import type { Review, CreateReview } from "../pages/Reviews";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const getReviewsByGame = async (
  gameId: string
): Promise<Review[]> => {
  const res = await axios.get<Review[]>(`${API_URL}/reviews/game/${gameId}`);
  return res.data;
};

export const createReview = async (
  reviewData: CreateReview,
  token: string
): Promise<Review> => {
  const res = await axios.post<Review>(`${API_URL}/reviews`, reviewData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteReview = async (
  id: string,
  token: string
): Promise<{ message: string }> => {
  const res = await axios.delete<{ message: string }>(`${API_URL}/reviews/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
