import { SignUpUser } from "../models/User";
import axios from "axios";
import Cookies from "js-cookie";

const url = `${import.meta.env.VITE_API_URL}/auth`;

export const sign_in = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${url}/signin`, {username, password});
        const {user, token} = response.data;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        Cookies.set('auth-token', token, {secure: true, sameSite: 'strict'})

        return user;
    }
    catch (err) {
        throw err;
    }
}

export const sign_up = async (user: SignUpUser) => {
    try {
        await axios.post(url + '/signup', user);
        return sign_in(user.email, user.password)
    }
    catch (err) {
        throw err;
    }
}

export const sign_out = () => {
    Cookies.remove('auth-token');
    delete axios.defaults.headers.common['Authorization'];
}

export const change_password = async (currentPassword: string, newPassword: string) => {
    try {
        await axios.post(`${url}/change-password`, {
            currentPassword,
            newPassword
        });

        return true
    }
    catch {
        return false
    }
}

export const check_username = async (username: string) => {
    try {
        await axios.get(`${url}/check-username/${username}`);
        return true;
    }
    catch {
        return false;
    }
}