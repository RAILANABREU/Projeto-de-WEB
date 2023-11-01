import axios from 'axios'

const baseURL = 'http://localhost:3000'

export function getAllUsers(){
    const response = axios.get(`${baseURL}`)
}