import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ModalEspecie from './ModalEspecie'; // Importamos el modal

const ViewEspecie = ({ especie }) => {
  const user = useSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className='card' style={{ width: '18rem' }}>
      <div className='card-header'>
        <h3>{especie.commonName}</h3>
      </div>
      <div className='card-body'>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          Ver detalles
        </button>

        {modalOpen && <ModalEspecie especie={especie} onClose={() => setModalOpen(false)} />}

        {user && (
          <div className="mt-3">
            <button className="btn btn-warning me-2">Editar</button>
            <button className="btn btn-danger">Eliminar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewEspecie;


