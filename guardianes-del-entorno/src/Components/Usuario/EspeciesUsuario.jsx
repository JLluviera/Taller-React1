import React, { useState, useEffect } from 'react';
import ViewEspecieUser from '../Especies/ViewSpeciesUser';

const EspeciesUsuario = ({ user }) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedSpecies, setSelectedSpecies] = useState(null); // Para controlar la especie seleccionada

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError("");
                const res = await fetch(`https://mammal-excited-tarpon.ngrok-free.app/api/species/byUser?userId=${user.id}&page=${page}&pageSize=${pageSize}`);
                
                if (!res.ok) throw new Error("Error al obtener los datos");

                const newData = await res.json();

                setData((prevData) => (page === 1 ? newData.items : [...prevData, ...newData.items]));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, page]);

    const handleViewMore = (species) => {
        setSelectedSpecies(species); // Establece la especie seleccionada
    };

    const handleCloseModal = () => {
        setSelectedSpecies(null); // Cierra el modal
    };

    return (
        <>
            <table className='table table-striped'>
                {loading && <tbody><tr><td colSpan="4">Cargando...</td></tr></tbody>}
                {error && <tbody><tr><td colSpan="4" className="text-danger">{error}</td></tr></tbody>}

                <thead>
                    <tr>
                        <th>Nombre común</th>
                        <th>Categoría</th>
                        <th>Estado de conservación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                
                {data.length > 0 ? (
                    <tbody>
                        {data.map((species) => (
                            <tr key={species.id}>
                                <td>{species.commonName}</td>
                                <td>{species.category}</td>
                                <td>{species.conservationStatus}</td>
                                <td>
                                    <button 
                                        type="button" 
                                        className="btn btn-primary" 
                                        onClick={() => handleViewMore(species)} // Muestra el modal
                                    >
                                        Ver más
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td colSpan="4" className="table-danger">No hay datos de Especie</td>
                        </tr>
                    </tbody>
                )}
            </table>

            {/* Modal */}
            {selectedSpecies && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="DatosEspecieUserLabel" aria-hidden="false">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>Especie</h3>
                            </div>
                            <div className="modal-body">
                                <ViewEspecieUser especie={selectedSpecies} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EspeciesUsuario;


