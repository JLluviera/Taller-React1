import React, { useState, useEffect } from "react";
import ViewAreas from "./ViewAreas";
import ModalCargaDatosArea from "../ModalCargaDatos/CargaDatosArea";
import { useSelector } from "react-redux";

const ListAreas = () => {
  const user = useSelector((state) => state.user)
  const [filters, setFilters] = useState({
    keyword: "",
    areaType: "",
    region: "",
    conservationStatus: "",
  });

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 10; // Tamaño de página fijo
  const [error, setError] = useState("");

  const filterOrder = ["keyword", "areaType", "region", "conservationStatus"];

  useEffect(() => {
    let url = "https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/list?secret=TallerReact2025!&";

    filterOrder.forEach((key) => {
      if (filters[key]) url += `${key}=${encodeURIComponent(filters[key])}&`;
    });

    url += `Page=${page}&PageSize=${pageSize}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los datos");
        return res.json();
      })
      .then((newData) => {
        setData((prevData) => (page === 1 ? newData.items : [...prevData, ...newData.items]));
      })
      .catch((err) => setError(err.message));
  }, [filters, page]); 

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1); // Resetear página cuando se cambia un filtro
  };

  return (
    <div className="container mt-4">
      <h2>Lista con Filtros</h2>

      <div className="dropdown mb-4">
        <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Filtros
        </button>
        <ul className="dropdown-menu p-3" style={{ minWidth: "250px" }}>
          {filterOrder.map((key) => (
            <li key={key} className="mb-2">
              <input
                type="text"
                name={key}
                className="form-control"
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={filters[key]}
                onChange={handleFilterChange}
              />
            </li>
          ))}
          <li>
            <button
              className="btn btn-danger btn-sm mt-2 w-100"
              onClick={() => {
                setFilters({ keyword: "", areaType: "", region: "", conservationStatus: "" });
                setPage(1);
              }}
            >
              Limpiar Filtros
            </button>
          </li>
        </ul>
      </div>

      {error && <p className="text-danger text-center">{error}</p>}
      <div className="row mt-4">
              {user? <ModalCargaDatosArea/> : null}
      </div>
      <div className="row mt-4">
        {data.length === 0 ? (
          <p className="text-center">No hay resultados</p>
        ) : (
          data.map((item, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <ViewAreas area={item} indexArea={index} />
            </div>
          ))
        )}
      </div>

      {data.length > 0 && (
        <div className="text-center mt-3">
          <button className="btn btn-success" onClick={() => setPage((prev) => prev + 1)}>
            Load More
          </button> 
        </div>
      )}
    </div>
  );
};

export default ListAreas;
