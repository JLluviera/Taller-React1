import React from 'react'
import { useState } from "react";

const Register = () => {
    const [user, setUser] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const PostUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        let userData = { 
            User: {
                name : user, 
                username: user,
                email: email,
                password: password
            }
        };
        try {
            const response = await fetch("https://mammal-excited-tarpon.ngrok-free.app/api/user/register?secret=TallerReact2025!", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true",
                },
<<<<<<< HEAD
                body: JSON.stringify(
                    userData
                )
=======
                body: JSON.stringify({
                    User: {
                        name: name,
                        username: user,
                        email: email,
                        password: password
                    }
                })
>>>>>>> 161ccf34c5a92c9a144bbbb24aa68273c40fbfff
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.Result === true) {
                alert("Usuario registrado correctamente, ya puede logearse");
            } else {
                alert("Error al registrar usuario");
            }

        } catch (error) {
            setError(error.message);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const HandleSubmit = async (e) => {
        e.preventDefault();
        await PostUser(e);
    };

    return (

        <div>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#RegisterModal">
            Registrarme
        </button>
    
        <div className="modal fade text-black" id="RegisterModal" tabIndex="-1" aria-labelledby="RegisterModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="RegisterModalLabel">Registro</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={HandleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Nombre de usuario</label>
                                <input type="text" className="form-control" id="username" onChange={(e) => setUser(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Correo electrónico</label>
                                <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? "Registrando..." : "Registrarse"}
                            </button>
                        </form>
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                    </div>
                </div>
            </div>
        </div>
    </div>
    

    );  
};

export default Register;
