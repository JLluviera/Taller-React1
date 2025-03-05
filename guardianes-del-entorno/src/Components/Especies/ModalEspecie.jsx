import React from 'react';
import './ModalEspecie.css'; // Estilos opcionales

const ModalEspecie = ({ especie, onClose }) => {
  return (
    <div className='modal-backdrop'>
      <div className='modal-content'>
        <button className='modal-close' onClick={onClose}>✖</button>
        <h2>{especie.commonName}</h2>
        <ul>
          <li><strong>Nombre Científico:</strong> {especie.scientificName}</li>
          <li><strong>Categoría:</strong> {especie.category}</li>
          <li><strong>Estado de Conservación:</strong> {especie.conservationStatus}</li>
        </ul>
      </div>
    </div>
  );
};

export default ModalEspecie;
