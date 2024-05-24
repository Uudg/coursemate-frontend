import axios from 'axios';

const url = import.meta.env.VITE_API_URL + '/search';

export const search = (data: string) => {
    try {
        return axios.post(`${url}`, {data});
    } catch (err) {
        console.log(err);
        throw err;
    }
}


