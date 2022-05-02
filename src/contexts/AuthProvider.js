import React, { createContext } from 'react';
import authUser from '../hooks/useUser';
export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const allContexts = authUser();
    return (
        <AuthContext.Provider value={allContexts}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;