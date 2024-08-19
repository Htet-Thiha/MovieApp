import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UUID from 'react-native-uuid';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading , setIsLoading ] = useState(false);
    
    const checkAuthentication = async () => {
        try {
            const token = await AsyncStorage.getItem('key');
            if (token !== null) {
                setIsAuthenticated(true);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        checkAuthentication();
    }, []);

    const login = async (username, password) => {
        setIsLoading(true);
        if (username === 'Htet' && password === 'Htet') {
            const uniqueToken = UUID.v4();
            await AsyncStorage.setItem('key', uniqueToken);
            setTimeout(()=>{
                setIsAuthenticated(true);
                setIsLoading(false);
            },2000)

            return true;

        } else {
            alert('Wrong Input!!!');
            setIsLoading(false);
            return false;
        }
    };

    const logout = async () => {
        setIsLoading(true);

        await AsyncStorage.removeItem('key');
        setTimeout(()=>{
            setIsAuthenticated(false);
            setIsLoading(false);
        },2000)

    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout ,isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
