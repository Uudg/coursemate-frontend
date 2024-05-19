import axios from 'axios';
import Cookies from 'js-cookie';

const ws_url = import.meta.env.VITE_WS_URL + '/groups';

export const get_chats = () => {
    const url = import.meta.env.VITE_API_URL + '/groups'
    
    try {
        return axios.get(url);
    }
    catch (err) {
        console.log(err)
        throw err
    }
}

export const get_chat = (id: string) => {
    try {
        return new WebSocket(`${ws_url}/${id}?token=${Cookies.get('auth-token')}`)
    } catch (err) {
        console.log(err)
        throw err
    }
}
