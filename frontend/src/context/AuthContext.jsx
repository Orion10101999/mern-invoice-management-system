
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [isAdmin,setIsAdmin] = useState(true)

    useEffect(() => {
        // Fetch user info from localStorage
        const userId = localStorage.getItem('userId');
        const admin = localStorage.getItem('isAdmin');
        setUser(userId)
        setIsAdmin(admin)
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading , isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
