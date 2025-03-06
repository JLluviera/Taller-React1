import React, { useState, useEffect } from 'react';
import ViewAreas from '../Areas/ViewAreas';

const AreaUsuario = ({ user }) => {
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
                const res = await fetch(`https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/byUser?secret=TallerReact2025!?userId=${user.id}&page=${page}&pageSize=${pageSize}`);
                
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
            <table className="table table-striped">
                {loading && <tbody><tr><td colSpan="4">Cargando...</td></tr></tbody>}
                {error && <tbody><tr><td colSpan="4" className="text-danger">{error}</td></tr></tbody>}
                
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Estado de conservación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                {data.length > 0 ? (
                    <tbody>
                        {data.map((area) => (
                            <tr key={area.id}>
                                <td>{area.name}</td>
                                <td>{area.areaType}</td>
                                <td>{area.conservationStatus}</td>
                                <td>
                                    <button 
                                        type="button" 
                                        className="btn btn-primary" 
                                        data-bs-toggle="modal" 
                                        data-bs-target={`#DatosAreaUserModal-${area.id}`}
                                    >
                                        Ver más
                                    </button>

                                    {/* Modal */}
                                    <div className="modal fade text-black" id={`DatosAreaUserModal-${area.id}`} tabIndex="-1" aria-labelledby={`DatosAreaUserLabel-${area.id}`} aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className='modal-header'>
                                                    <h3>Area Natural</h3>
                                                </div>
                                                <div className='modal-body'>
                                                    <ViewAreas area={area} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td colSpan="4" className="table-danger">No hay datos de área</td>
                        </tr>
                    </tbody>
                )}
            </table>
        </>
    );
};

export default AreaUsuario;

