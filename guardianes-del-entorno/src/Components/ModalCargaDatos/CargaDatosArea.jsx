import React, { useState } from 'react';
import { useSelector } from 'react-redux';


const ModalCargaDatosArea = () => {  // Recibe setAreas como prop
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [areaType, setAreaType] = useState("");
    const [region, setRegion] = useState("");
    const [conservationStatus, setConservationStatus] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const user = useSelector((state) => state.user);

    const PostArea = async (e) => {
        e.preventDefault();
        setLoading(true);

        let postAreaData = {
            userId: user.id,
            naturalArea: {
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
            const response = await fetch("https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/insert?secret=TallerReact2025!", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postAreaData)
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
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#DatosAreaModal">
                Agregar un Area Protegida
            </button>
            <div className="modal fade text-black" id="DatosAreaModal" tabIndex="-1" aria-labelledby="DatosAreaLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="DatosAreaLabel">Ingreso de datos</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={PostArea}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nombre del Area</label>
                                    <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="location" className="form-label">Ubicación</label>
                                    <input type="text" className="form-control" id="location" onChange={(e) => setLocation(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="areaType" className="form-label">Tipo de Area</label>
                                    <input type="text" className="form-control" id="areaType" onChange={(e) => setAreaType(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="region" className="form-label">Región</label>
                                    <input type="text" className="form-control" id="region" onChange={(e) => setRegion(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="conservationStatus" className="form-label">Estado de Conservación</label>
                                    <input type="text" className="form-control" id="conservationStatus" onChange={(e) => setConservationStatus(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Descripción</label>
                                    <input type="text" className="form-control" id="description" onChange={(e) => setDescription(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="imageUrl" className="form-label">URL de imagen</label>
                                    <input type="text" className="form-control" id="imageUrl" onChange={(e) => setImageUrl(e.target.value)} required />
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

export default ModalCargaDatosArea;
