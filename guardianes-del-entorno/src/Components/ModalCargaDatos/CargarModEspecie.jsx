import React, {  useEffect, useState } from 'react';
import { useSelector } from 'react-redux';  // Importa useSelector

const ModalCargaDatosEspeciesMod = ({ especie }) => { 
    const user = useSelector((state) => state.user);

    const [commonName, setCommonName] = useState(especie.commonName);
    const [scientificName, setScientificName] = useState(especie.scientificName);
    const [category, setCategory] = useState(especie.category);
    const [conservationStatus, setConservationStatus] = useState(especie.conservationStatus);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setCommonName(especie.commonName);
        setScientificName(especie.scientificName);
        setCategory(especie.category);
        setConservationStatus(especie.conservationStatus);
    }, [especie]);

    const PostEspecies = async () => {
        setLoading(true);
        setError(null);

        let postEspeciesDataMod = {
            userId: user.id,
            species: {
                id : especie.id,
                commonName: commonName,
                scientificName: scientificName,
                category: category,
                conservationStatus: conservationStatus,
                naturalAreaId: especie.naturalAreaId
            }
        };

        try {
            const response = await fetch("https://mammal-excited-tarpon.ngrok-free.app/api/species/update?secret=TallerReact2025!", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postEspeciesDataMod)
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

    const HandleSubmitEspeciesMod = (e) => {
        e.preventDefault();
        PostEspecies();
    }

  return (
        <div>
          {user && (
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#DatosEspecieModModal">
                Modificar Especie
            </button>
          )}
            <div className="modal fade text-black" id="DatosEspecieModModal" tabIndex="-1" aria-labelledby="DatosEspecieModLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="DatosEspecieModLabel">Ingreso de datos</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={HandleSubmitEspeciesMod}>  
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
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? "Actualizando..." : "Actualizar Especie"}
                                </button>  
                            </form>                         
                        </div>
                    </div>
                </div>
            </div>
          
        </div>
      );
};

export default ModalCargaDatosEspeciesMod;