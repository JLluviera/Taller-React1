import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../userSlice";
import ListaUsuario from "./Usuario/ListaUsuario";

const UserProfile = () => {
    const userProfile = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [showUsers, setShowUsers] = useState(false);
    const pageSize = 10;
    const userId = 1; // Temporalmente fijo

    const fetchUsers = async (pageNumber) => {
        setLoading(true);

        try {
            const response = await fetch(
                `https://mammal-excited-tarpon.ngrok-free.app/api/user/list?secret=TallerReact2025!&userId=${userId}&page=${pageNumber}&pageSize=${pageSize}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "true",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status}`);
            }

            const data = await response.json();

            if (data.users?.items) {
                setUsers((prevUsers) => {
                    const mergedUsers = [...prevUsers, ...data.users.items];
                    const uniqueUsers = Array.from(new Map(mergedUsers.map(user => [user.id, user])).values());
                    return uniqueUsers;
                });
                setTotalRecords(data.users.totalRecords || 0);
            } else {
                setError("No se encontraron usuarios.");
            }
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            setError("Error al obtener los usuarios. Inténtalo más tarde.");
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        if (users.length >= totalRecords) return;

        setPage((prevPage) => {
            const nextPage = prevPage + 1;
            fetchUsers(nextPage);
            return nextPage;
        });
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const toggleUserList = () => {
        if (!showUsers) {
            fetchUsers(1);
        } else {
            // Limpiar datos al cerrar
            setUsers([]);
            setPage(1);
            setTotalRecords(0);
            setError("");
        }
        setShowUsers(!showUsers);
    };

    const handleViewProfile = (userId) => {
        alert(`Ver perfil del usuario ID: ${userId}`);
        // Aquí podrías redirigir a otra página con `navigate()` si usas React Router
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-lg">
                <div className="card-body">
                    <h2 className="text-center">Bienvenido {userProfile.name}</h2>
                    <button className="btn btn-danger w-100 mb-3" onClick={handleLogout}>LogOut</button>

                    {!showUsers && (
                        <button className="btn btn-primary w-100 mb-3" onClick={toggleUserList}>
                            Cargar Usuarios
                        </button>
                    )}

                    {showUsers && (
                        <>
                            {error && <div className="alert alert-danger text-center">{error}</div>}

                            <ul className="list-group">
                                {users.map((user) => (
                                    <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 className="mb-1">{user.name}</h5>
                                            <p className="text-muted">{user.email}</p>
                                        </div>
                                        <button 
                                            className="btn btn-info btn-sm"
                                            onClick={() => handleViewProfile(user.id)}
                                        >
                                            Ver perfil
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            {/* Contenedor para los botones alineados */}
                            <div className="d-flex justify-content-between mt-3">
                                {users.length < totalRecords && (
                                    <button 
                                        onClick={handleLoadMore} 
                                        className="btn btn-secondary"
                                        disabled={loading}
                                    >
                                        {loading ? "Cargando más..." : "Ver más"}
                                    </button>
                                )}
                                
                                <button 
                                    onClick={toggleUserList} 
                                    className="btn btn-danger"
                                >
                                    Cerrar Lista
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;


