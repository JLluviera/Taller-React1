import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


const CargarModArea = ( {area} ) => {  
    const [name, setName] = useState(area.name);
    const [location, setLocation] = useState(area.location);
    const [areaType, setAreaType] = useState(area.areaType);
    const [region, setRegion] = useState(area.region);
    const [conservationStatus, setConservationStatus] = useState(area.conservationStatus);
    const [description, setDescription] = useState(area.description);
    const [imageUrl, setImageUrl] = useState(area.imageUrl);
    const [loading, setLoading] = useState(false);

    const user = useSelector((state) => state.user);

    useEffect(() => {
        setName(area.name);
        setLocation(area.location);
        setAreaType(area.areaType);
        setRegion(area.region);
        setConservationStatus(area.conservationStatus);
        setDescription(area.description);
        setImageUrl(area.imageUrl);
      }, [area]);

    const PostAreaMod = async (e) => {
        e.preventDefault();
        setLoading(true);

        let postAreaDataMod = {
            userId: user.id,
            naturalArea: {
                id: area.id,
                name: name,
                location: location,
                areaType: areaType,
                region: region,
                conservationStatus: conservationStatus,
                description: description,
                imageUrl: imageUrl
            }
        };

        try {
            const response = await fetch("https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/update?secret=TallerReact2025!", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postAreaDataMod)
            });

            const data = await response.json();

            if (data.response.result === true){
                alert("Ingresado correctamente");
            }

        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#DatosAreaModModal">
                Modificar Area  
            </button>
            <div className="modal fade text-black" id="DatosAreaModModal" tabIndex="-1" aria-labelledby="DatosAreaModLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="DatosAreaModLabel">Ingreso de datos</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={PostAreaMod}>
                                <div className="mb-3">
                                    <label htmlFor="nameMod" className="form-label">Nombre del Area</label>
                                    <input type="text" className="form-control" id="nameMod" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="locationMod" className="form-label">Ubicación</label>
                                    <input type="text" className="form-control" id="locationMod" value={location} onChange={(e) => setLocation(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="areaTypeMod" className="form-label">Tipo de Area</label>
                                    <input type="text" className="form-control" id="areaTypeMod" value={areaType} onChange={(e) => setAreaType(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="regionMod" className="form-label">Región</label>
                                    <input type="text" className="form-control" id="regionMod" value={region} onChange={(e) => setRegion(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="conservationStatusMod" className="form-label">Estado de Conservación</label>
                                    <input type="text" className="form-control" id="conservationStatusMod" value={conservationStatus} onChange={(e) => setConservationStatus(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="descriptionMod" className="form-label">Descripción</label>
                                    <input type="text" className="form-control" id="descriptionMod" value={description} onChange={(e) => setDescription(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="imageUrlMod" className="form-label">URL de imagen</label>
                                    <input type="text" className="form-control" id="imageUrlMod" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? "Registrando..." : "Registrar Area"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CargarModArea;