import React from 'react';
import './ModalEspecie.css'; // Estilos opcionales
import ShowComment from '../Comments/ShowComment';
import CommentInput from '../Comments/CommentInput';
import { useSelector } from 'react-redux';

const ModalEspecie = ({ especie, onClose }) => {
   const user = useSelector((state) => state.user);
  return (
    <div className='modal-backdrop'>
      <div className='modal-dialog modal-dialog-scrolleable'>
        <div className='modal-content'>
          <button className='modal-close' onClick={onClose}>✖</button>
          <h2>{especie.commonName}</h2>
          <ul>
            <li><strong>Nombre Científico:</strong> {especie.scientificName}</li>
            <li><strong>Categoría:</strong> {especie.category}</li>
            <li><strong>Estado de Conservación:</strong> {especie.conservationStatus}</li>
            <li><ShowComment entityId={especie.id} entityType={"species"} /> </li>
            <li><CommentInput userId={user.id} speciesId={especie.id} /></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModalEspecie;
