import { useNavigate } from "react-router-dom";
import useUser from "../../../hooks/useUser";

function ProtectedRoute({ children }) {

    const { user } = useUser();
    // console.log(user)
    let navigate = useNavigate();

    return user ? children : navigate(`/login`);
}

export default ProtectedRoute;
