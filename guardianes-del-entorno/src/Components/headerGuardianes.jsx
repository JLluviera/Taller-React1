import React from 'react'
import '../App.css'
import Register from './Register'

export default function HeaderGuardianes() {
  return (
  <div>
        <header className="container-fluid header">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="row in-line-flex">
                    <div className="col-12">
                        <h1>Guardianes del Entorno</h1>
                        <p >¡Cuidando nuestro planeta!</p>
                    </div>
                    <div>
                        <Register />
                    </div>
                </div>
            </nav>        
        </header>
   </div>  
  )}
