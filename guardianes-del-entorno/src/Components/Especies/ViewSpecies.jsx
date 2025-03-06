import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ModalEspecie from './ModalEspecie'; // Importamos el modal
import DeleteSpecies from '../Deleters/DeleteSpecies';
import ModalCargaDatosEspeciesMod from '../ModalCargaDatos/CargarModEspecie';

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
            <ModalCargaDatosEspeciesMod especie={especie} />
            <DeleteSpecies idSpecies={especie.id}/>

          </div>
        )}
      </div>
    </div>
  );
};

export default ViewEspecie;


