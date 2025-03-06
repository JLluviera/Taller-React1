import React, { useState, useEffect } from 'react';
import ViewActividades from '../Actividades/ViewActividades';

const ActividadesUsuario = ({ user }) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null); // Para controlar la actividad seleccionada

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError("");
                const res = await fetch(`https://mammal-excited-tarpon.ngrok-free.app/api/conservation-activity/byUser?userId=${user.id}&page=${page}&pageSize=${pageSize}`);
                
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

    const handleViewMore = (activity) => {
        setSelectedActivity(activity); // Establece la actividad seleccionada
    };

    const handleCloseModal = () => {
        setSelectedActivity(null); // Cierra el modal
    };

    return (
        <>
            <table className='table table-striped'>
                {loading && <tbody><tr><td colSpan="4">Cargando...</td></tr></tbody>}
                {error && <tbody><tr><td colSpan="4" className="text-danger">{error}</td></tr></tbody>}

                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                
                {data.length > 0 ? (
                    <tbody>
                        {data.map((activity) => (
                            <tr key={activity.id}>
                                <td>{activity.description}</td>
                                <td>{activity.status}</td>
                                <td>{activity.date}</td>
                                <td>
                                    <button 
                                        type="button" 
                                        className="btn btn-primary" 
                                        onClick={() => handleViewMore(activity)} // Muestra el modal
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
                            <td colSpan="4" className="table-danger">No hay datos de actividad</td>
                        </tr>
                    </tbody>
                )}
            </table>

            {/* Modal */}
            {selectedActivity && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="DatosActividadUserLabel" aria-hidden="false">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>Actividad de Conservación</h3>
                            </div>
                            <div className="modal-body">
                                <ViewActividades actividad={selectedActivity} />
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

export default ActividadesUsuario;



