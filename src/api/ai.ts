import axios from 'axios';

const url = import.meta.env.VITE_API_URL + '/ai';


interface Message {
    role: string,
    content: string
}

export const chat = (messages: Message[]) => {
    try {
        return axios.post(`${url}`, {messages});
    } catch (err) {
        console.log(err)
        throw err
    }
}