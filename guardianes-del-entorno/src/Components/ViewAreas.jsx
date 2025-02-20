import React from 'react'

<<<<<<< HEAD
const ViewAreas = () => {
  return (
    <div>ViewAreas</div>
=======
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
          dsds
          d
        <p className='card-text'>{area.description}</p>
        </div>
      </div>

    </div>
>>>>>>> 161ccf34c5a92c9a144bbbb24aa68273c40fbfff
  )
}

export default ViewAreas