import axios from 'axios'

const baseURL = 'https://billbuddy-et97.onrender.com'

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
          
        return { success: true, data: response.data.message };
    } catch (error) {
        console.log(error)
        console.error("Erro ao criar Evento convite:", error.response.data.message);
        return { success: false, error: error.response.data.error };
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

export async function respostaConvite(data, authToken){
    try {
        const response = await axios.post(`${baseURL}/evento/accept/`, data, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return { success: true, data: response.data.message };
    } catch (error) {
        console.error("Erro ao responder convite:", error.response.data.message);
        return { success: false, error: error.response.data.message };
    }
}

export async function addGasto(data, authToken){
    try{
        const response = await axios.post(`${baseURL}/evento/incluirgasto`, data, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return { success: true, data: response.data.message };
    } catch (error) {
        console.error("Erro ao incluir gasto convite:", error.response.data.message);
        return { success: false, error: error.response.data.message };
    }
}
export async function delGasto(data, authToken){
    try{
        const response = await axios.post(`${baseURL}/evento/excluirgasto`, data, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return { success: true, data: response.data.message };
    } catch (error) {
        console.error("Erro ao incluir gasto convite:", error.response.data.message);
        return { success: false, error: error.response.data.message };
    }
}

export async function delConvidado(data, authToken){
    try{
        const response = await axios.post(`${baseURL}/evento/deletarConvidado`, data, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return { success: true, data: response.data.message };
    } catch (error) {
        console.error("Erro ao deletar convidado:", error.response.data.message);
        return { success: false, error: error.response.data.message };
    }
}

export async function excluirEvento(eventoid, authToken){
    try{
        const response = await axios.delete(`${baseURL}/evento/delete/${eventoid}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return { success: true, data: response.data.message };
    } catch (error) {
        console.error("Erro ao excluir evento convite:", error.response.data.message);
        return { success: false, error: error.response.data.message };
    }
}

export async function alterarConvidados(data, authToken){
    try{
        const response = await axios.put(`${baseURL}/evento/alterarConvidados`,data, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return { success: true, data: response.data.message };
    } catch (error) {
        console.log(error)
        console.error("Erro ao alterar Convidados:", error.response.data.message);
        return { success: false, error: error.response.data.message };
    }
}
