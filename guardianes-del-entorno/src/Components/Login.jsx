import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../userSlice"; // Importar la acción de Redux
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Agregado para mostrar carga
  const dispatch = useDispatch(); // Hook para usar Redux

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Iniciar el loading
    setError("");
    setMessage("");

    if (!email || !password) {
      setError("Por favor, complete todos los campos.");
      setLoading(false); // Detener el loading
      return;
    }

    try {
      const response = await fetch(
        "https://mammal-excited-tarpon.ngrok-free.app/api/user/login?secret=TallerReact2025!",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.status === 403) {
        setError("Acceso denegado: Código secreto incorrecto");
        setLoading(false); // Detener el loading
        return;
      }
      if (response.status === 500) {
        setError("Error interno del servidor");
        setLoading(false); // Detener el loading
        return;
      }

      const data = await response.json();
      if (data.isValid && data.user) {
        setMessage("Login exitoso!!");
        dispatch(setUser(data.user)); // Guardar usuario en Redux
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false); // Detener el loading
    }
  };

  return (
    <div>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#LoginModal">
        Iniciar Sesión
      </button>

      <div className="modal fade text-black" id="LoginModal" tabIndex="-1" aria-labelledby="LoginModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="LoginModalLabel">Iniciar Sesión</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {message && <div className="alert alert-success">{message}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Iniciando sesión..." : "Ingresar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
 