import React from 'react'

const ViewAreas = ({ area }) => {
 
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
            <li className='list-group-item'> 
              <botton className='btn btn-primary'>Agregar Especie</botton>
              
                        </li>
          </ul>
        </div>
      </div>

    </div>
  )
}

export default ViewAreas