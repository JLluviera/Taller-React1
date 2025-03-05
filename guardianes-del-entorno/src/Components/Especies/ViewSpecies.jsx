import React from 'react';
import { useSelector } from 'react-redux';

const ViewEspecie = ({ especie }) => {
  const user = useSelector((state) => state.user);

  return (
    <div className='card' style={{ width: '18rem' }}>
      <div className='card-header'>
        <h3>{especie.commonName}</h3>
      </div>
      <div className='card-body'>
        <a 
          className="btn btn-primary" 
          data-bs-toggle="collapse" 
          href="#collapseInfoEspecie" 
          role="button" 
          aria-expanded="false" 
          aria-controls="collapseInfoEspecie"
        >
          Más información
        </a>
        <div className='collapse' id='collapseInfoEspecie'>
          <ul className="list-group list-group-flush">
            <li className='list-group-item'><strong>Nombre Científico:</strong> {especie.scientificName}</li>
            <li className="list-group-item"><strong>Categoria:</strong> {especie.category}</li>
            <li className="list-group-item text-secondary"><strong>Estado de Conservación:</strong> {especie.conservationStatus}</li>
            
            {user && (
              <li className='list-group-item'> 
                <button 
                  className="btn btn-secondary" 
                  type="button" 
                  data-bs-toggle="collapse" 
                  data-bs-target="#collapseOpcionesEspecie" 
                  aria-expanded="false" 
                  aria-controls="collapseOpcionesEspecie"
                >
                  Más opciones
                </button>
                <div className="collapse d-inline-flex" id="collapseOpcionesEspecie">
                  <button className='btn btn-warning'>Editar</button>
                  <button className='btn btn-danger'>Eliminar</button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewEspecie;

