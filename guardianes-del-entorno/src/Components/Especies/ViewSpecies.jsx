import React from "react";
import { useSelector } from "react-redux";

const ViewSpecies = ({ id, commonName, scientificName, category, conservationStatus, naturalAreaId, onUpdate }) => {
    const user = useSelector((state) => state.user);

    // Función para actualizar especie
    const updateSpecies = () => {
        if (!user) return alert("Debes iniciar sesión para editar.");
        
        const updatedSpecies = {
            userId: user.id,
            species: {
                id,
                commonName: commonName + " (Editado)",
                scientificName,
                category,
                conservationStatus,
                naturalAreaId
            }
        };

        fetch("https://mammal-excited-tarpon.ngrok-free.app/api/species/update?secret=TallerReact2025!", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedSpecies)
        })
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                alert("Especie actualizada!");
                onUpdate();
            }
        })
        .catch(error => console.error("Error al actualizar especie:", error));
    };

    // Función para eliminar especie
    const deleteSpecies = () => {
        if (!user) return alert("Debes iniciar sesión para eliminar.");
        
        const confirmDelete = window.confirm("¿Estás seguro de eliminar esta especie?");
        if (!confirmDelete) return;

        const body = {
            userId: user.id,
            speciesId: id
        };

        fetch("https://mammal-excited-tarpon.ngrok-free.app/api/species/delete?secret=TallerReact2025!", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                alert("Especie eliminada!");
                onUpdate();
            }
        })
        .catch(error => console.error("Error al eliminar especie:", error));
    };

    return (
        <div className="card" style={{ width: "18rem", margin: "10px" }}>
            <div className="card-header d-flex justify-content-between align-items-center">
                <h2 className="mb-0">{commonName}</h2>
            </div>

            <div className="card-body">
                <p><strong>Nombre científico:</strong> {scientificName}</p>
                <p><strong>Categoría:</strong> {category}</p>
                <p><strong>Estado de conservación:</strong> {conservationStatus}</p>
                <p><strong>Área natural:</strong> {naturalAreaId}</p>
            </div>

                <div className="card-footer d-flex justify-content-between">
                    <button className="btn btn-warning" onClick={updateSpecies}>Editar</button>
                    <button className="btn btn-danger" onClick={deleteSpecies}>Borrar</button>
                </div>
        </div>
    );
};

export default ViewSpecies;