import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';  // Importa useSelector


const ModalCargaDatosEspecies = () => {
    const user = useSelector((state) => state.user);

    const [commonName, setCommonName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [category, setCategory] = useState("");
    const [conservationStatus, setConservationStatus] = useState("");
    const [naturalAreaId, setNaturalAreaId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const PostEspecies = async (e) => {
        e.preventDefault();
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
                body: JSON.stringify(
                    postEspeciesData
                )
            });

            if(!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if(data.result === true) {
                alert("Especie registrada correctamente");
            } else {
                alert("Error al registrar especie");
            }
        }catch(error) {
            setError(error.message);
            alert(`Error: ${error.message}`);
            setLoading(false);
        }
    }

    const HandleSubmitEspecies = async (e) => {
        e.preventDefault();
        await PostEspecies(e);
    }

  return (
        <div>
            <div className="modal fade text-black" id="DatosArea" tabIndex="-1" aria-labelledby="DatosAreaLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="DatosAreaLabel">INgreso de datos</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={HandleSubmitEspecies}>  
                                <div className="mb-3">
                                    <label htmlFor="commonName" className="form-label">Nombre Común</label>
                                    <input type="text" className="form-control" id="commonName" name="commonName" value={commonName} onChange={(e) => setCommonName(e.target.value)} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="scientificName" className="form-label">Nombre Científico</label>
                                    <input type="text" className="form-control" id="scientificName" name="scientificName" value={scientificName} onChange={(e) => setScientificName(e.target.value)} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Categoría</label>
                                    <input type="text" className="form-control" id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="conservationStatus" className="form-label">Estado de Conservación</label>
                                    <input type="text" className="form-control" id="conservationStatus" name="conservationStatus" value={conservationStatus} onChange={(e) => setConservationStatus(e.target.value)} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="naturalAreaId" className="form-label">Id de Area Natural</label>
                                    <input type="text" className="form-control" id="naturalAreaId" name="naturalAreaId" value={naturalAreaId} onChange={(e) => setNaturalAreaId(e.target.value)} required/> 
                                </div>
                                <button type="submit" className="btn btn-primary">Guardar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ModalCargaDatosEspecies