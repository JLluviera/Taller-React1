import React from 'react'
import { useSelector } from 'react-redux'

const ModArea = () => {
    const user = useSelector((state) => state.user)


  return (
    <div>
        <button className='btn btn-secondary'></button>
    </div>
  )
}

export default ModArea