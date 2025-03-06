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
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Estado de Conservacion</th>
                <th>Ver Mas</th>
            </thead>
            <tbody>
                <tr>
                    <td className='table-info'>Areas</td>
                    <AreaUsuario user={user}/>
                    <td className='table-info'>Especies</td>
                    <EspeciesUsuario user={user}/>
                    <td className='table-info'>Actividades</td>
                    <ActividadesUsuario user={user}/>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default ListaUsuario