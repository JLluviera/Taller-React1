import React, { useState, useEffect } from "react";
import ViewSpecies from "./ViewSpecies.jsx";

const ListSpecies = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");

  const pageSize = 10;

  const [filters, setFilters] = useState({
      keyword: "",
      category: "",
      conservationStatus: "",
      naturalAreaId: "",
    });

    const filterOrder = ["keyword", "category", "conservationStatus", "naturalAreaId"];

  useEffect(() => {
      let url = "https://mammal-excited-tarpon.ngrok-free.app/api/species/list?secret=TallerReact2025!&";
  
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
      <h2>Lista de Especies</h2>
      {error && <p className="text-danger text-center">{error}</p>}

      <div className="row">
        {/* Filtros a la izquierda */}
        <div className="col-md-3">
          <div className="card p-3">
            <h5 className="mb-3">Filtros</h5>
            {filterOrder.map((key) => (
              <div key={key} className="mb-2">
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

        <div className="col-md-9">
          {data.length === 0 ? (
            <p className="text-center">No hay resultados</p>
          ) : (
            data.map((item, index) => (
             <div className="col-md-4 mb-3" key={index}>
                <ViewSpecies especie={item} />
              </div>
            ))
          )}
      </div>
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

export default ListSpecies;
