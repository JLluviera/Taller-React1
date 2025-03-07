import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const CommentInput = ({ userId, naturalAreaId, speciesId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment || rating < 1) {
      alert("Por favor, ingresa un comentario y una calificación.");
      return;
    }

    setLoading(true);
    setError(null);

    const newComment = {
      userId,
      naturalAreaId: naturalAreaId || null,
      speciesId: speciesId || null,
      comment,
      rating,
    };

    try {
      const response = await fetch("https://mammal-excited-tarpon.ngrok-free.app/api/comment/insert?secret=TallerReact2025!", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: newComment }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el comentario");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setComment("");
      setRating(0);
    }
  };

  return (
    <div className="p-4 border rounded shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-2">Agrega un comentario</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Escribe tu comentario aquí..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
        <div className="flex items-center my-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer text-xl ${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar Comentario"}
        </button>
        {error && <p className="text-red-500 mt-2">Error: {error}</p>}
      </form>
    </div>
  );
};

export default CommentInput;
