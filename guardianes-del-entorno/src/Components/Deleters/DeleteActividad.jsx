import React from 'react'
import { useSelector} from 'react-redux';
import { useState } from 'react';

const DeleteActividad = ( {idActividad} ) => {
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);

    const handleDeleteActividad = async (e) => {
        e.preventDefault();
        const deleteActividadData = {
            userId: user.id,
            actividadId: idActividad
        };

        try {
            setLoading(true);
            const response = await fetch("https://mammal-excited-tarpon.ngrok-free.app/api/conservation-activity/delete?secret=TallerReact2025!", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(deleteActividadData),
            });
            
            if(!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.result === true) {
                alert("Actividad eliminada correctamente");
            } else {
                alert("Error al eliminar actividad");
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }finally {
            setLoading(false);
        }
    }

        return (
            <button 
                className="btn btn-danger" 
                onClick={handleDeleteActividad} 
                disabled={loading} 
            >
                {loading ? "Eliminando..." : "Eliminar Actividad"}
            </button>
        );
}

export default DeleteActividad