import React, { useState, useEffect } from "react";
import ViewSpecies from "./ViewSpecies.jsx";

const ListSpecies = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [showLess, setShowLess] = useState(false);

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
        if (page === 1) {
          setData(newData.items);
        } else {
          setData((prevData) => [...prevData, ...newData.items]);
        }
        setHasMore(newData.items.length === pageSize);
      })
      .catch((err) => setError(err.message));
  }, [filters, page]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
    setShowLess(false);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    setShowLess(true);
  };

  const handleShowLess = () => {
    setPage(1);
    setShowLess(false);
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
                setFilters({ keyword: "", category: "", conservationStatus: "", naturalAreaId: "" });
                setPage(1);
                setShowLess(false);
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
            <div className="row">
              {data.map((item, index) => (
                <div className="col-md-4 mb-3" key={index}>
                  <ViewSpecies especie={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {data.length > 0 && (
        <div className="text-center mt-3">
          <p>Mostrando {data.length} especies, Página {page}</p>
          {showLess && (
            <button className="btn btn-warning me-2" onClick={handleShowLess}>
              Ver Menos
            </button>
          )}
          {hasMore && (
            <button className="btn btn-success" onClick={handleLoadMore}>
              Ver Más
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ListSpecies;

