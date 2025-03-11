import { Navigate,Outlet } from "react-router-dom";

import { useSelector} from "react-redux";
import { RootState } from "../redux/store";

const PrivateRoute = () => {
    const {token} = useSelector((state:RootState) => state.auth);
    if(typeof  token !== "string"){
        return <Navigate to="/login" />
    }
    return <Outlet />;
}

export default PrivateRoute;