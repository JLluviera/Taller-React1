import React from 'react'
import { useSelector } from 'react-redux'

const ViewAreas = ({ area }) => {
  const user = useSelector((state) => state.user)

  return (
    <div className='card' style={{width: "18rem"}}>
      <img src={area.image} className='card-img-top' alt='area.name' />
      <div className='card-header'>
        <h3>{area.name}</h3>  
      </div>
      <div className='card-body'>
        <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseInfo" role="button" aria-expanded="false" aria-controls="collapseExample">
          Mas informacion
        </a>
        <div className='collapse' id='collapseInfo'>
          <ul className="list-group list-group-flush">
            <li className='list-group-item'>{area.areaType}</li>
            <li className="list-group-item">{area.description}</li>
            <li className="list-group-item text-secondary">{area.conservationStatus}</li>
            <li className="list-group-item text-secondary">{area.location}</li>
            <li className='list-group-item text-secondary'>{area.region}</li>
            {user? (
            <li className='list-group-item'> 
              <button class="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOpcionesArea" aria-expanded="false" aria-controls="collapseOpcionesArea">
              Mas opciones
              </button>
              <div className="collapse d-inline-flex" id="collapseOpcionesArea">
                <button className='btn btn-primary'>Agregar Especie</button>
                <button className='btn btn-secondary'>Agregar Actividad</button>
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