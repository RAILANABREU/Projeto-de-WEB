import axios from 'axios'

const baseURL = 'http://localhost:3000'

export function signup(data){
    delete data.senha2;
    const body = {
        ...data,
    }
    const response = axios.post(`${baseURL}/user/register`, data);
    return response;
}