import React, {createContext, useState} from "react";


export const AuthContext = createContext();

export const AuthProvider = (children) => {
    const [test, setTest] = useState('test value');
    return (
        <AuthContext.Provider value={test}>
            {children}
        </AuthContext.Provider>
    );
};