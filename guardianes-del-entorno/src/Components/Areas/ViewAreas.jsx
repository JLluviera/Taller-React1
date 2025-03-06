import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CargarDatosActividad from "../ModalCargaDatos/CargaDatosActividad";
import CargarDatosEspecies from "../ModalCargaDatos/CargaDatosEspecies";
import LearnMoreAreas from './LearnMoreAreas';

const ViewAreas = ({ area }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);  // Estado para manejar el colapso
  const [isOptionsCollapsed, setIsOptionsCollapsed] = useState(false); // Estado para las opciones

  const user = useSelector((state) => state.user);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);  // Función para alternar el estado del colapso
  const toggleOptionsCollapse = () => setIsOptionsCollapsed(!isOptionsCollapsed);  // Función para alternar el estado de opciones

  return (
    <div className="card" style={{ width: "24rem" }}>
      <img src={area.image} className="card-img-top" alt={area.name} />
      <div className="card-header">
        <h3>{area.name}</h3>
      </div>
      <div className="card-body">
        {/* Botón para abrir/cerrar el colapso de la información */}
        <button 
          className="btn btn-primary" 
          type="button" 
          aria-expanded={isCollapsed} 
          onClick={toggleCollapse} 
        >
          {isCollapsed ? 'Cerrar información' : 'Más información'}
        </button>

        {/* Colapso de la información */}
        <div className={`collapse ${isCollapsed ? 'show' : ''}`} id={area.id}>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{area.areaType}</li>
            <li className="list-group-item">{area.description}</li>
            <li className="list-group-item text-secondary">{area.conservationStatus}</li>
            <li className="list-group-item text-secondary">{area.location}</li>
            <li className="list-group-item text-secondary">{area.region}</li>
            <li className="list-group-item"> <LearnMoreAreas Area={area} /> </li>
            {user ? (
              <li className="list-group-item">
                <button 
                  className="btn btn-secondary" 
                  type="button" 
                  aria-expanded={isOptionsCollapsed} 
                  onClick={toggleOptionsCollapse}
                >
                  {isOptionsCollapsed ? 'Cerrar opciones' : 'Más opciones'}
                </button>
                <div className={`collapse ${isOptionsCollapsed ? 'show' : ''}`} id={`collapseOpcionesArea${area.id}`}>
                  <CargarDatosActividad idArea={area.id} />
                  <CargarDatosEspecies idArea={area.id} />
                </div>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewAreas;
