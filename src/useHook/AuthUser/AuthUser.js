import axios from "axios";
import { useEffect, useState } from "react";

const AuthUser = () => {

    const [currentUser, setCurrentUser] = useState(undefined);
    const [role, setRole] = useState(undefined)

    useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem("user")).access_token;
        axios.get('https://hasadahoup-mongo-server.herokuapp.com/up/db_user', { headers: { 'token': token } })
            .then(res => {
                setCurrentUser(res?.data);
                setRole(res?.data?.data?.role);
            })
    }, [])
    
    return {
        currentUser,
        role
    }
}
export default AuthUser;