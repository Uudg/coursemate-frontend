import axios from 'axios';

const url = import.meta.env.VITE_API_URL + '/posts';

export const get = (type: string) => {
    try {
        return axios.get(`${url}/${type}`);
    }
    catch (err) {
        console.log(err)
        throw err
    }
}

export const get_post_user = (id: string) => {
    try {
        return axios.get(`${url}/user/${id}`);
    }
    catch (err) {
        console.log(err)
        throw err
    }
}

export const get_post = (id: string) => {
    try {
        return axios.get(`${url}/${id}`);
    }
    catch (err) {
        console.log(err)
        throw err
    }
}

export const create_post = (data: {title: string, content: string, tags: string[]}) => {
    try {
        return axios.post(`${url}`, data)
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

export const like = (id: string) => {
    try {
        return axios.post(`${url}/like/${id}`);
    }
    catch (err) {
        console.log(err)
        throw err
    }
}

export const dislike = (id: string) => {
    try {
        return axios.post(`${url}/dislike/${id}`);
    }
    catch (err) {
        console.log(err)
        throw err
    }
}

export const get_replies = (id: string) => {
    try {
        return axios.get(`${url}/${id}/replies`);
    }
    catch (err) {
        console.log(err)
        throw err
    }
}

export const save_reply = (id: string, body: string) => {
    console.log(axios.defaults.headers)
    try {
        return axios.post(`${url}/${id}/replies`, {
            body: body
        });
    }
    catch (err) {
        console.log(err)
        throw err
    }
}

export const del_reply = (id: string) => {
    try {
        return axios.delete(`${url}/${id}/replies`);
    }
    catch (err) {
        console.log(err)
        throw err
    }
}