import { useSelector } from "react-redux";
import { logout } from "../userSlice";

const UserProfile = () => {
    const userProfile = useSelector((state) => state.user)
  
    return(
        <div>
            <h2 className="">Bienvenido {userProfile.name}</h2>
            <botton className="btn btn-danger" onClick={logout}>LogOut</botton>
        </div>
    )
};

export default UserProfile;