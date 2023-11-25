import axios from 'axios'

const baseURL = 'http://localhost:3000'

export function getAllEvents(authToken){
    try{
        const response = axios.get(`${baseURL}/evento/findAll`,{
            headers:{
                Authorization: `Bearer ${authToken}`
            }
        });
        return response;
    }catch(error){
        console.error("Erro ao encontrar evento:", error.response.data.message);
        throw error;
    }
    
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
        console.error("Erro ao criar evento:", error.response.data.message);
        throw error;
    }
}

export async function getEventoByID(id, authToken){
    try{
        const response = await axios.get(`${baseURL}/evento/find/${id}`, {
            headers:{
                Authorization: `Bearer ${authToken}`
            }
        })
        return response.data
    }catch(error){
        console.error("Erro ao encontrar evento:", error.response.data.message);
        throw error;
    }
}
export async function editarEvento(data, authToken){
    try{
        const response = await axios.post(`${baseURL}/evento/update/`, data, {
            headers:{
                Authorization: `Bearer ${authToken}`
            }
        })
        return response.data
    }catch(error){
        console.error("Erro ao editar evento:", error.response.data.message);
        throw error;
    }
}

export async function convidar(data, authToken) {
    try {
        const response = await axios.post(`${baseURL}/evento/invite/`, data, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return { success: true, data: response.data.message };

    } catch (error) {
        console.error("Erro ao enviar convite:", error.response.data.message);
        return { success: false, error: error.response.data.message };
    }
}
