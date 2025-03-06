import React, { useEffect, useState } from 'react'
import AreaUsuario from './AreaUsuario';
import EspeciesUsuario from './EspeciesUsuario';
import ActividadesUsuario from './ActividadesUsuario';


const ListaUsuario = ( {user} ) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(false);
        setError("");
    }, [user]);

  return (
    <div className='container-fluid'>
        <h2>Areas naturales, Especies y Actividades cargadas por el Usuario</h2>
        <AreaUsuario user={user} />
        <EspeciesUsuario user={user} />
        <ActividadesUsuario user={user} />
    </div>
  )
}

export default ListaUsuario