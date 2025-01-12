import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUser, loginUser, registerUser, logoutUser } from '../services/auth';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user; // Derive isAuthenticated from the user object

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await getUser();
            setUser(currentUser);
            setLoading(false);
        };

        fetchUser();
    }, []);

    const login = async (email, password) => {
        const loggedInUser = await loginUser(email, password);
        setUser(loggedInUser);
    };

    const register = async (userData) => {
        const newUser = await registerUser(userData);
        setUser(newUser);
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
