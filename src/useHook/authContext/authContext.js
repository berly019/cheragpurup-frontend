import React, { createContext } from 'react';
import AuthUser from '../AuthUser/AuthUser'
export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const allContexts = AuthUser();
    return (
        <AuthContext.Provider value={allContexts}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;