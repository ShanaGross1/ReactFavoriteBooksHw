import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = React.createContext();

const AuthContextComponent = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const { data } = await axios.get('/api/account/getcurrentuser');
            setUser(data);
            setIsLoading(false);
        }

        getUser();
    }, []);

    if (isLoading) {
        return (
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <h1 className="mt-3">Loading, please wait...</h1>
                    <p>We're preparing everything for you.</p>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthDataContext = () => useContext(AuthContext);

export default AuthContextComponent;