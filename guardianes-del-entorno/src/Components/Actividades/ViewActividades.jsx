import React from 'react'

const ViewActividades = ({actividad}) => {
  return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{actividad.description}</h5>
            </div>
            <div className="card-footer text-muted">
                {actividad.date}
            </div>
        </div>  )
}

export default ViewActividades