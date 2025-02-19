import React from 'react'

const Register = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    PostUser = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/user/register?secret=TallerReact2025!', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "User":{
                    "username": user,
                    "email": email,
                    "password": password
                    }
                })
            });}
            catch (error) {
                setError(error);
            }
            const data = await response.json();
        }
        
        if (data.Result === true){
            alert("Usuario registrado correctamente, ya puede logearse");
        } else alert("Error al registrar usuario");
        setLoading(false);
    };

    HandleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        this.PostUser();
        setLoading(false);
    }

  return (
    <div class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Registro</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form onSubmit={HandleSubmit}>
                    <div class="mb-3">
                        <label for="username" class="form-label">Nombre de usuario</label>
                        <input type="text" class="form-control" id="username" onChange={(e) => setUser(e.target.value)} required/>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Correo electrónico</label>
                        <input type="email" class="form-control" id="email" onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="password" onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <button type="submit" class="btn btn-primary">Registrarse</button>
                </form>
            </div>
            </div>
        </div>
    </div>
)


export default Register