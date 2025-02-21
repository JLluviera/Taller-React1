import React from 'react'
import '../App.css'


const Footer =() => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-4">
    <div className="container">
      <p className="mb-1">&copy; {new Date().getFullYear()} Guardianes del Entorno</p>
      <p className="mb-1">¡Cuidando nuestro planeta!</p>
      <div className="d-flex justify-content-center gap-3">
        <a href="#" className="text-white">Términos y condiciones</a>
        <a href="#" className="text-white">Política de privacidad</a>
        <a href="#" className="text-white">Contacto</a>
      </div>
    </div>
  </footer>
  )
}

export default Footer
