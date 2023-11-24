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

export async function criarEvento(data, authToken){
    try{
        const response = await axios.post(`${baseURL}/evento/create`, data, {
            headers:{
                Authorization: `Bearer ${authToken}`
            }
          })
          
        return response
    }catch(error){
        console.error("Erro ao criar evento:", error.message);
        throw error;
    }

}