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
        <header className="container-fluid header bg-dark text-white p-3">
            <div className="d-flex align-items-center justify-content-between">
                <div className="logo">
                    <video autoPlay loop muted width="70" height="70">
                        <source src="https://cdn-icons-mp4.flaticon.com/512/14955/14955450.mp4" type="video/mp4" />
                        Tu navegador no soporta el video.
                    </video>
                </div>
                <div className="text-center flex-grow-1">
                    <h1 className="mb-0">Guardianes del Entorno</h1>
                    <p className="mb-0">¡Cuidando nuestro planeta!</p>
                </div>
                <div className="d-flex gap-2">
                    {!user ? <Register /> : null}
                    {user ? <UserProfile /> :  <Login />}
                </div>
            </div>
        </header>
</div>  
  )}
