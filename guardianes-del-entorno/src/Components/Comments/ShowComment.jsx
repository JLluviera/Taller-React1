import React, { useState } from "react";
import { useSelector } from "react-redux";

const ShowComment = ({ entityId, entityType, pageSize = 10 }) => {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const userId = useSelector((state) => state.user?.id);

  const fetchComments = async (currentPage, reset = false) => {
    if (!userId) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://mammal-excited-tarpon.ngrok-free.app/api/comment/byEntityId?secret=TallerReact2025!&userId=${userId}&${entityType}Id=${entityId}&page=${currentPage}&pageSize=${pageSize}`
      );
      if (!response.ok) {
        throw new Error("Error al cargar los comentarios");
      }
      const data = await response.json();

      setComments((prev) => (reset ? data.items : [...prev, ...data.items]));
      setHasMore(data.length === pageSize);
      setPage(currentPage);
      setIsLoaded(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    fetchComments(page + 1);
  };

  return (
    <div className="p-4 border rounded shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-2">Comentarios</h2>
      <button
        onClick={() => fetchComments(1, true)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-2"
      >
        Cargar Comentarios
      </button>
      {!isLoaded && <p>Haz clic en el botón para cargar los comentarios.</p>}
      {comments.length === 0 && isLoaded && !loading && <p>No hay comentarios aún.</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <ul>
        {comments.map((comment, index) => (
          <li key={index} className="border-b py-2">
            <p className="color-black">{comment.text}</p>
            <p className="text-sm ">Rating: {comment.rating} ⭐</p>
          </li>
        ))}
      </ul>
      {hasMore && !loading && comments.length > 0 && (
        <button
          onClick={handleLoadMore}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
        >
          Cargar más
        </button>
      )}
      {loading && <p>Cargando...</p>}
    </div>
  );
};

export default ShowComment;
