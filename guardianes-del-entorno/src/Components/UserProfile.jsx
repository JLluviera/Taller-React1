import { useDispatch, useSelector } from "react-redux";
import { logout } from "../userSlice";
import ListaUsuario from "./Usuario/ListaUsuario";

const UserProfile = () => {
    const userProfile = useSelector((state) => state.user)
    const dispatch = useDispatch();
  
    const handleLogout = () => {
        dispatch(logout());
    }

    

    return(
        <div>
            <h2 className="">Bienvenido {userProfile.name}</h2>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#perfilModal">
                Ver Perfil
            </button>
            <div className="display-inline-flex">
                <div className="modal fade text-black" id="perfilModal" tabIndex="-1" aria-labelledby="perfilModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <ListaUsuario user={userProfile} />
                        </div>                        
                    </div>
                </div>
                <button className="btn btn-danger" onClick={handleLogout}>LogOut</button>
            </div>
        </div>

        
    )
};


export default UserProfile;