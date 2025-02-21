import React, { useState } from 'react';

const ViewSpecies = () => {
  const species = {
    id: 1,
    commonName: "Jaguar",
    scientificName: "Panthera onca",
    category: "Mamífero",
    conservationStatus: "En peligro",
    naturalAreaId: 1
  };

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className='card' style={{ width: "18rem" }}>
      <div className='card-header'>
        <h2>{species.commonName}</h2>
      </div>
      <div className='card-body'>
        {!showDetails && (
          <a 
            className="btn btn-primary"
            onClick={() => setShowDetails(true)}
            role="button"
          >
            Más información
          </a>
        )}

        {showDetails && (
          <div>
            <div className='collapse show'>
              <p><strong>Nombre científico:</strong> {species.scientificName}</p>
              <p><strong>Categoría:</strong> {species.category}</p>
              <p><strong>Estado de conservación:</strong> {species.conservationStatus}</p>
              <p><strong>Área natural:</strong> {species.naturalAreaId}</p>
            </div>
            <button 
              className="btn btn-secondary mt-2"
              onClick={() => setShowDetails(false)}
            >
              Ver menos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSpecies;
