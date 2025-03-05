import React from 'react'
import { useSelector } from 'react-redux'
import CargarDatosActividad from "../ModalCargaDatos/CargaDatosActividad"
import CargarDatosEspecies from "../ModalCargaDatos/CargaDatosEspecies"

const ViewAreas = ({ area }) => {
  const user = useSelector((state) => state.user)

  return (
    <div className='card' style={{width: "18rem"}}>
      <img src={area.image} className='card-img-top' alt='area.name' />
      <div className='card-header'>
        <h3>{area.name}</h3>  
      </div>
      <div className='card-body'>
        <button className="btn btn-primary" data-bs-toggle="collapse" data-bs-target={`#${area.id}`} aria-expanded="false" aria-controls={area.id}>
          Mas informacion
        </button>
        <div className='collapse' id={area.id}>
          <ul className="list-group list-group-flush">
            <li className='list-group-item'>{area.areaType}</li>
            <li className="list-group-item">{area.description}</li>
            <li className="list-group-item text-secondary">{area.conservationStatus}</li>
            <li className="list-group-item text-secondary">{area.location}</li>
            <li className='list-group-item text-secondary'>{area.region}</li>
            {user? (
            <li className='list-group-item'> 
              <button className="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target= {`#collapseOpcionesArea${area.id}`} aria-expanded="false" aria-controls= {`collapseOpcionesArea${area.id}`}>
              Mas opciones
              </button>
              <div className="collapse d-inline-flex" id={`collapseOpcionesArea${area.id}`}>
                <CargarDatosActividad idArea={area.id}/>
                <CargarDatosEspecies idArea={area.id}/>
              </div>
            </li> 
            ): null }
          </ul>

        </div>
      </div>

    </div>
  )
}

export default ViewAreas