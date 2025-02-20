import React from 'react'
import { useSelector } from 'react-redux';
import '../App.css'
import Register from './Register'
import Login from './Login'
import UserProfile from './UserProfile';

export default function HeaderGuardianes() {
    const user = useSelector((state) => state.user);
  return (
  <div>
        <header className="container-fluid header bg-dark text-white text-center p-3">
                <div className="row in-line-flex">
                    <div className="col-12">
                        <h1>Guardianes del Entorno</h1>
                        <p >¡Cuidando nuestro planeta!</p>
                    </div>
                    <div>
                        <Register />
                        {user ? <UserProfile /> : <Login />}
                    </div>
                </div>
        </header>
   </div>  
  )}
