
import { useState, useEffect } from 'react';

const useUser = () => {
    const [user, setUser] = useState({});
    const [role, setRole] = useState(undefined);

    // get user information
    useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem("user"));
        if (token) {
            fetch(`${process.env.REACT_APP_BASE_URL}/up/db_user/user/token`, {
                method: 'POST',
                headers: { Authorization: 'Bearer ' + token.access_token }
            }).then(response => response.json())
                .then(data => {
                    setRole(data?.data?.role);
                    setUser(data?.data);
                    // console.log(data?.data?.role);
                });
        }
    }, []);


    return {
        user,
        role
    }
}

export default useUser;