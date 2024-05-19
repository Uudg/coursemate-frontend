import axios from 'axios';

const url = import.meta.env.VITE_API_URL + '/users';



export const get_user = (id: string) => {
        try {
            return axios.get(`${url}/${id}`);
        }
        catch (err) {
            console.log(err)
            throw err
        }
}

export const update_user = (id: string, data: {status: string, bg_img: boolean, profile_img: boolean}, formdata: FormData) => {
    console.log(formdata)
    try {
        return axios.put(`${url}/${id}?user=${encodeURIComponent(JSON.stringify(data))}`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (err) {
        console.log(err);
        throw err;
    }
}