import React, { use } from 'react'
import { useSelector } from 'react-redux'

const ViewActividadesUsuario = () => {
  const user = useSelector((state) => state.user)
    
  return (
    <div>ViewActividades</div>
  )
}

export default ViewActividadesUsuario