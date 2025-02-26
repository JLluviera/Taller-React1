import React, { useState } from "react";
import { useSelector } from "react-redux";

const DeleteArea = ({ idArea }) => {  
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDeleteArea = async (e) => {  
        e.preventDefault();
        setLoading(true);
        setError(null);

        const deleteAreaData = {
            userId: user.id,
            naturalAreaId: idArea
        };

        try {
            const response = await fetch("https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/delete?secret=TallerReact2025!", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(deleteAreaData),
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.result === true) {
                alert("Área eliminada correctamente");
            } else {
                alert("Error al eliminar área");
            }
        } catch (error) {
            setError(error.message);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <button 
            className="btn btn-danger" 
            onClick={handleDeleteArea} 
            disabled={loading} 
        >
            {loading ? "Eliminando..." : "Eliminar Área"}
        </button>
    );
};

export default DeleteArea;