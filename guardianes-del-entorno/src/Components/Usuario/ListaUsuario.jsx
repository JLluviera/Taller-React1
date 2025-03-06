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
    <div>
        <h2>Areas naturales, Especies y Actividades cargadas por el Usuario</h2>
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Estado de Conservacion</th>
                    <th>Ver Mas</th>
                </tr>
            </thead>
            <tbody>                
                    <tr className='table-info'>Areas</tr>
                    <AreaUsuario user={user}/>
                    <tr className='table-info'>Especies</tr>
                    <EspeciesUsuario user={user}/>
                    <tr className='table-info'>Actividades</tr>
                    <ActividadesUsuario user={user}/>
            </tbody>
        </table>
    </div>
  )
}

export default ListaUsuario