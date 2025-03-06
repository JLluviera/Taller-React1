import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';

const LearnMoreAreas = ( { Area } ) => {
    const user = useSelector((state => state.user));
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  return (
    <div>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target={`#DatosAreaModalPlus${Area.id}`}
      >
        Conocer más
      </button>

      <div
        className="modal fade text-black"
        id={`DatosAreaModalPlus${Area.id}`}
        tabIndex="-1"
        aria-labelledby={`DatosAreaModalPlus${Area.id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">{Area.name}</h3>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <img src={Area.image} alt={Area.name} className="img-fluid rounded mb-3" />
              <p><strong>Tipo de Área:</strong> {Area.areaType}</p>
              <p><strong>Descripción:</strong> {Area.description}</p>
              <p><strong>Estado de Conservación:</strong> {Area.conservationStatus}</p>
              <p><strong>Ubicación:</strong> {Area.location}</p>
              <p><strong>Región:</strong> {Area.region}</p>
              <div><strong>Calificación:</strong> {Array.from({ length: 5 }, (_, i) => i < Area.rating ? '⭐' : '☆')}</div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default LearnMoreAreas