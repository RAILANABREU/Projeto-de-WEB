import axios from 'axios'

const baseURL = 'http://localhost:3000'

export function getAllEvents(){
    const response = axios.get(`${baseURL}/eventos`);
    return response;
}