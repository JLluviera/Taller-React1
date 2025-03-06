import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../userSlice";
import ListaUsuario from "./Usuario/ListaUsuario";

const UserProfile = () => {
    const userProfile = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    // Verifica que el usuario tenga ID antes de usarlo
    const modalId = userProfile?.id ? `perfil${userProfile.id}Modal` : "perfilModal";

    return (
        <div className="container mt-4">
            <div className="card shadow-lg">
                <div className="card-body">
                    <h2 className="text-center">
                        Bienvenido {userProfile?.name || "Usuario"}
                    </h2>

                    {/* Botón para abrir modal */}
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
                        Ver Perfil  
                    </button>

                    {/* Modal */}
                    <div className="modal fade text-black" id={modalId} tabIndex="-1" aria-labelledby={modalId} aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <ListaUsuario user={userProfile} />
                            </div>
                        </div>
                    </div>

                    {/* Botón de Logout */}
                    <button className="btn btn-danger w-100 mb-3" onClick={handleLogout}>
                        LogOut
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;



