
import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';  // Para useSelector

import ViewSpecies from "../Especies/ViewSpecies"; 
import ModalCargaDatosEspecies from "../ModalCargaDatos/CargaDatosEspecies";


const ListaEspecies = () => {
    const [speciesList, setSpeciesList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const user = useSelector((state) => state.user); // Obtener usuario logueado

    // Función para obtener especies (Todas o por usuario)
    const fetchSpecies = () => {
        let url = "https://mammal-excited-tarpon.ngrok-free.app/api/species";
        
        // Si hay usuario, listar sus especies
        if (user) {
            url = `https://mammal-excited-tarpon.ngrok-free.app/api/species/byUser?secret=TallerReact2025!&userId=${user.id}&page=1&pageSize=10`;
        }

        fetch(url, {
            method: "GET",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
            },
            credentials: "include", // Si la API usa cookies o autenticación
          })
            .then(response => response.json())
            .then(data => setSpeciesList(data.items || []))
            .catch(error => console.error("Error al obtener especies:", error));
    };

    useEffect(() => {
        fetchSpecies();
    }, [user]); // Se recarga cuando cambia el usuario

    return (
        <div className="container">
            <h1 className="text-center">Lista de Especies</h1>
            
            {/* Botón para abrir el modal */}
                <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
                    Agregar Especie
                </button>
            

            {/* Modal de carga de especies */}
            {showModal && (
                <ModalCargaDatosEspecies 
                    onClose={() => setShowModal(false)} 
                    onSpeciesAdded={fetchSpecies} 
                />
            )}

            {/* Lista de especies */}
            <div className="listaEspecies">
                {speciesList.length > 0 ? (
                    speciesList.map((species) => (
                        <ViewSpecies key={species.id} {...species} onUpdate={fetchSpecies} />
                    ))
                ) : (
                    <p className="text-center">No hay especies disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default ListaEspecies;
