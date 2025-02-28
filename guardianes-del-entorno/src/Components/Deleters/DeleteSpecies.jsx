import React, { useState } from "react";
import { useSelector } from "react-redux";

const DeleteSpecies = ({ idSpecies }) => {  
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDeleteSpecies = async (e) => {  
        e.preventDefault();
        setLoading(true);
        setError(null);

        const deleteSpeciesData = {
            userId: user.id,
            speciesId: idSpecies
        };

        try {
            const response = await fetch("https://mammal-excited-tarpon.ngrok-free.app/api/species/delete?secret=TallerReact2025!", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(deleteSpeciesData),
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.Success) {
                alert("Especie eliminada correctamente");
            } else {
                alert("Error al eliminar la especie");
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
            onClick={handleDeleteSpecies} 
            disabled={loading} 
        >
            {loading ? "Eliminando..." : "Eliminar Especie"}
        </button>
    );
};

export default DeleteSpecies;
