import React, { useState, useEffect } from 'react';
import ViewEspecie from '../Especies/ViewSpecies';

const EspeciesUsuario = ({ user }) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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

    return (
        <>
            {loading && <tr><td colSpan="4">Cargando...</td></tr>}
            {error && <tr><td colSpan="4" className="text-danger">{error}</td></tr>}
            
            {data.length > 0 ? (
                data.map((species) => (
                    <tr key={species.id}>
                        <td>{species.commonName}</td>
                        <td>{species.category}</td>
                        <td>{species.conservationStatus}</td>
                        <td>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#DatosEspecieUserModal-${species.id}`}>
                                Ver más
                            </button>

                            {/* Modal */}
                            <div className="modal fade text-black" id={`DatosEspecieUserModal-${species.id}`} tabIndex="-1" aria-labelledby={`DatosEspecieUserLabel-${species.id}`} aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <ViewEspecie especie={species} />
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="4" className="table-danger">No hay datos de Especie</td>
                </tr>
            )}
        </>
    );
};

export default EspeciesUsuario;
