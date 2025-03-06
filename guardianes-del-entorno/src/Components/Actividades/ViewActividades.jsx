import React from 'react';
import DeleteActividad from '../Deleters/DeleteActividad';
import ModActividades from './ModActividades';

const ViewActividades = ({ actividad }) => {
    return (
        <div className="card shadow-sm">
            {/* Título */}
            <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{actividad.description}</h5>
            </div>

            {/* Contenido */}
            <div className="card-body">
                <p className="card-text">
                    <strong>Fecha: </strong>
                    <span className="fw-bold">{actividad.date}</span>
                </p>
            </div>

            {/* Footer con botón eliminar */}
            <div className="card-footer text-muted text-center">
                <DeleteActividad idActividad={actividad.id} />
                <ModActividades actividad={actividad} />
            </div>
        </div>
    );
};

export default ViewActividades;
