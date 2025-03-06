import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ModalEspecie from './ModalEspecie';

const ViewEspecieUser = ({ especie }) => {
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
      </div>
    </div>
  );
};

export default ViewEspecieUser;


