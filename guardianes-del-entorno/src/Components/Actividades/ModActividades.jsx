import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const ModActividades = ({ actividad }) => {
  const user = useSelector((state) => state.user);

  // Inicializamos los valores con cadenas vacías si la actividad no tiene valores definidos
  const [descripcion, setDescripcion] = useState(actividad.Description || "");
  const [date, setDate] = useState(actividad.date || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  useEffect(() => {
    setDescripcion(actividad.Description || "");  // Evitar undefined
    setDate(actividad.date || "");  // Evitar undefined
    setError(null);
  }, [actividad]);

  const PostDatosActividad = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let postDatosActividadMod = {
      ConservationActivity: {
        id: actividad.id,
        userId: user.id,
        naturalAreaId: actividad.naturalAreaId,
        description: descripcion,
        date: date,
      },
    };

    try {
      const response = await fetch(
        'https://mammal-excited-tarpon.ngrok-free.app/api/conservation-activity/update?secret=TallerReact2025!',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postDatosActividadMod),
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.result === true) {
        alert('Actividad Modificada correctamente');
        setIsModalOpen(false);  // Cerrar el modal después de la respuesta positiva
      } else {
        alert('Error al modificar actividad');
      }
    } catch (error) {
      setError(error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const HandleSubmitActividades = async (e) => {
    e.preventDefault();
    await PostDatosActividad(e);
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setIsModalOpen(true)} // Abrir modal al hacer clic
      >
        Modificar Actividad
      </button>

      {isModalOpen && (
        <div className="modal show text-black" style={{ display: 'block' }} aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Ingreso de datos</h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)} // Cerrar el modal
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {error && <p className="text-danger text-center">{error}</p>}
                <form onSubmit={HandleSubmitActividades}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="descripcion">
                      Descripcion
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="descripcion"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="date">
                      Fecha de realizacion
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Modificando...' : 'Modificar Actividad'}
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

export default ModActividades;

