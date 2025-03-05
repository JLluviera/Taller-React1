import { useDispatch, useSelector } from "react-redux";
import { logout } from "../userSlice";

const UserProfile = () => {
    const userProfile = useSelector((state) => state.user)
    const dispatch = useDispatch();
  
    return(
        <div>
            <h2 className="">Bienvenido {userProfile.name}</h2>
            <button className="btn btn-danger" onClick={dispatch(logout())}>LogOut</button>
        </div>

        
    )
};


export default UserProfile;