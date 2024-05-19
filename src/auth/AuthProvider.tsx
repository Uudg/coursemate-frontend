import React, { ReactNode, useEffect, useState } from "react"
import AuthContext, { AuthContextType } from "./AuthContext";
import { sign_in, sign_out, sign_up, check_username, change_password } from "../services/auth.service";
import { LoggedInUser, SignUpUser } from "../models/User";
import Cookies from "js-cookie";
import axios from "axios";

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<LoggedInUser | null>(null);

    useEffect(() => {
        const token = Cookies.get('auth-token')
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const user = JSON.parse(localStorage.getItem('user') || '{}')
            setUser(user);
        }
    }, [])

    const signIn = async (username: string, password: string) => {
        const user = await sign_in(username, password);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    };

    const signOut = () => {
        sign_out();
        setUser(null);
    };

    const signUp = async (data: SignUpUser) => {
        const user = await sign_up(data);
        setUser(user);
    };

    const contextValue: AuthContextType = {
        user,
        signIn,
        signOut,
        signUp,
        checkUsername: check_username,
        changePasword: change_password
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}


export default AuthProvider;