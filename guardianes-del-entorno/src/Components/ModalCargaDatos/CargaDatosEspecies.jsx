import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ModalCargaDatosEspecies = ({ areas = [], setAreas }) => { 
    const user = useSelector((state) => state.user);

    const [commonName, setCommonName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [category, setCategory] = useState("");
    const [conservationStatus, setConservationStatus] = useState("");
    const [naturalAreaId, setNaturalAreaId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false); 

    const PostEspecies = async () => {
        setLoading(true);
        setError(null);

        let postEspeciesData = {
            userId: user.id,
            species: {
                commonName: commonName,
                scientificName: scientificName,
                category: category,
                conservationStatus: conservationStatus,
                naturalAreaId: naturalAreaId
            }
        };

        try {
            const response = await fetch("https://mammal-excited-tarpon.ngrok-free.app/api/species/insert?secret=TallerReact2025!", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postEspeciesData)
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.result === true) {
                alert("Especie registrada correctamente");
            } else {
                alert("Error al registrar especie");
            }
        } catch (error) {
            setError(error.message);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    const HandleSubmitEspecies = (e) => {
        e.preventDefault();
        PostEspecies();
    }

    return (
        <div className="container">
              
          <button
            className="btn btn-primary"
            onClick={() => setIsModalVisible(true)} 
          >
            Ingresar Especie
          </button>
    
          {isModalVisible && (
            <div className="modal fade show d-block" id="DatosArea" tabIndex="-1" aria-labelledby="DatosAreaLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="DatosAreaLabel">Ingreso de datos</h1>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setIsModalVisible(false)} 
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={HandleSubmitEspecies}>
                      <div className="mb-3">
                        <label htmlFor="commonName" className="form-label">Nombre Común</label>
                        <input
                          type="text"
                          className="form-control"
                          id="commonName"
                          value={commonName}
                          onChange={(e) => setCommonName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="scientificName" className="form-label">Nombre Científico</label>
                        <input
                          type="text"
                          className="form-control"
                          id="scientificName"
                          value={scientificName}
                          onChange={(e) => setScientificName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="category" className="form-label">Categoría</label>
                        <input
                          type="text"
                          className="form-control"
                          id="category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="conservationStatus" className="form-label">Estado de Conservación</label>
                        <input
                          type="text"
                          className="form-control"
                          id="conservationStatus"
                          value={conservationStatus}
                          onChange={(e) => setConservationStatus(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="naturalAreaId" className="form-label">Área Natural</label>
                        <select
                          className="form-select"
                          id="naturalAreaId"
                          onChange={(e) => setNaturalAreaId(e.target.value)}
                          required
                        >
                          <option value="">Seleccionar Área</option>
                          {Array.isArray(areas) && areas.length > 0 ? (
                            areas.map((area) => (
                              <option key={area.id} value={area.id}>
                                {area.name}
                              </option>
                            ))
                          ) : (
                            <option disabled>No hay áreas disponibles</option>
                          )}
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? "Registrando..." : "Registrar Especie"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
};

export default ModalCargaDatosEspecies;
