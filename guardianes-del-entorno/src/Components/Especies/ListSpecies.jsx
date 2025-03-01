import React, { useState, useEffect } from "react";
import ViewSpecies from "./ViewSpecies.jsx";
import ModalCargaDatosEspecies from '../ModalCargaDatos/CargaDatosEspecies.jsx';

const ListSpecies = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const pageSize = 10; 

  useEffect(() => {
    const url = `https://mammal-excited-tarpon.ngrok-free.app/api/species/listV?page=${page}&pageSize=${pageSize}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los datos");
        return res.json();
      })
      .then((newData) => {
        setData((prevData) => (page === 1 ? newData.Items : [...prevData, ...newData.Items]));
      })
      .catch((err) => setError(err.message));
  }, [page]);

  return (
    <div className="container mt-4">
      <h2>Lista de Especies</h2>
      {error && <p className="text-danger text-center">{error}</p>}

      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-primary" onClick={() => setModalVisible(true)}>
          Agregar Especie
        </button>
      </div>

      <div className="row mt-4">
        {data.length === 0 ? (
          <p className="text-center">No hay resultados</p>
        ) : (
          data.map((item, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <ViewSpecies species={item} />
            </div>
          ))
        )}
      </div>

      {data.length > 0 && (
        <div className="text-center mt-3">
          <button className="btn btn-success" onClick={() => setPage((prev) => prev + 1)}>
            Cargar Más
          </button>
        </div>
      )}

      {modalVisible && (
        <ModalCargaDatosEspecies setAreas={() => {}} areas={[]} />
      )}
    </div>
  );
};

export default ListSpecies;
