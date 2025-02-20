import React from 'react'

const ViewAreas = (area) => {
  return (
    <div className='card'>
      <img src={area.image} className='card-img-top' alt='area.name' />
      <div className='card-header'>
        <h3>{area.name}</h3>  
      </div>
      <div className='card-body'>
        <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseInfo" role="button" aria-expanded="false" aria-controls="collapseExample">
          Mas informacion
        </a>
        <div className='collapse' id='collapseInfo'>
        <p className='card-text'>{area.description}</p>
        </div>
      </div>

    </div>
  )
}

export default ViewAreas