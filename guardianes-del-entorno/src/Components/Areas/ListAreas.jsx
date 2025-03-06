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
  <h2 className="text-center mb-4">Lista con Filtros</h2>

  <div className="row">
    {/* Filtros a la izquierda */}
    <div className="col-md-4 col-lg-3 mb-4">
      <div className="card p-3 shadow-sm">
        <h5 className="mb-3">Filtros</h5>
        {filterOrder.map((key) => (
          <div key={key} className="mb-3">
            <input
              type="text"
              name={key}
              className="form-control"
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={filters[key]}
              onChange={handleFilterChange}
            />
          </div>
        ))}
        <button
          className="btn btn-danger btn-sm mt-2 w-100"
          onClick={() => {
            setFilters({ keyword: "", areaType: "", region: "", conservationStatus: "" });
            setPage(1);
          }}
        >
          Limpiar Filtros
        </button>
      </div>
    </div>

    {/* Lista de elementos a la derecha */}
    <div className="col-md-8 col-lg-9">
      {error && <p className="text-danger text-center">{error}</p>}
      
      <div className="row mt-4">
        {user ? <ModalCargaDatosArea /> : null}
      </div>
      
      <div className="row mt-4">
        {data.length === 0 ? (
          <p className="text-center text-muted">No hay resultados</p>
        ) : (
          data.map((item, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4" key={index}>
              <ViewAreas area={item} />
            </div>
          ))
        )}
      </div>

      {data.length > 0 && (
        <div className="text-center mt-4">
          <button className="btn btn-success" onClick={() => setPage((prev) => prev + 1)}>
            Cargar más
          </button>
        </div>
      )}
    </div>
  </div>
</div>

  );
} 

export default ListAreas;
