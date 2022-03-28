/* import React from "react";
import { Navigate, Route } from "react-router-dom";
import Cookies from 'js-cookie'

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const isAuthenticated = Cookies.get('userId');
    console.log("this", isAuthenticated);

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
            }
        />
    );
}

export default ProtectedRoute; */

import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {


    let navigate = useNavigate();

    const isAuthenticated = sessionStorage.getItem("user");
    // console.log(isAuthenticated);
    return isAuthenticated ? children : navigate(`/login`);
}

export default ProtectedRoute;