import axios from 'axios'

const baseURL = 'http://localhost:3000'

export function getAllEvents(authToken){
    const response = axios.get(`${baseURL}/evento/findAll`,{
        headers:{
            Authorization: `Bearer ${authToken}`
        }
    });
    return response;
}