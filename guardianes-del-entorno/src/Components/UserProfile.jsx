import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../userSlice";
import ListaUsuario from "./Usuario/ListaUsuario";
import "./UserProfile.css";

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
                        <div className="modal-dialog custom-modal">
                            <div className="modal-content">
                               <div className="modal-header">
                                    <h5 className="modal-title" id={`${modalId}Label`}>Perfil de Usuario</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <ListaUsuario user={userProfile} />
                                </div>
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



