import axios from 'axios';

const baseURL = 'https://billbuddy-et97.onrender.com';

export async function signup(data) {
  try {
    delete data.senha2;
    const response = await axios.post(`${baseURL}/user/register`, data);
    return { success: true, data: response.data };
    } catch (error) {
      console.error("Erro no cadastro:", error.response.data.error);
      return { success: false, error: error.response.data.message };
    }
}

export async function signin(data) {
  try {
    const response = await axios.post(`${baseURL}/login`, data);
    return { success: true, data: response.data };
    } catch (error) {
      console.error("Erro no login:", error.response.data.error);
      return { success: false, error: error.response.data.error };
    }
}

export async function FindUserByID(id, authToken) {
  try {
    const response = await axios.get(`${baseURL}/user/find/${id}`,{
      headers:{
          Authorization: `Bearer ${authToken}`
      }
    })
    const userFound = response.data.user;
    return userFound;
  }catch(error){
    console.error('Erro ao buscar usuário:', error.message);
    throw error;
  }
}

export async function editarperfil(data, authToken){
  try{
    const response = await axios.post(`${baseURL}/user/update`,data, {
      headers:{
        Authorization: `Bearer ${authToken}`
      }
    })
    return response.status
  }catch(error){
    console.error('Erro ao buscar usuário:', error.message);
    throw error;
  }
}

export async function userDel(userId, authToken){
  try{
    const response = await axios.delete(`${baseURL}/user/delete/${userId}`, {
      headers:{
        Authorization: `Bearer ${authToken}`
      }
    })
    return response.status
  }catch(error){
    console.error('Erro ao deletar usuário:', error.message);
    throw error;
  }
}

export async function recuperarSenha(data){
  try{
    const response = await axios.post(`${baseURL}/user/forgotPasswordToken`, data)
    return { success: true, userId: response.data.user.id, token: response.data.user.token};
    } catch (error) {
        console.error("Erro ao recuperar senha:", error.response.data.message);
        return { success: false, error: error.response.data.message };
    }
}

export async function resetarSenha(data){
  try{
    const response = await axios.post(`${baseURL}/user/resetPassword`, data)
    return { success: true, userId: response.data.user.id, token: response.data.user.token};
    } catch (error) {
        console.error("Erro ao recuperar senha:", error.response.data.message);
        return { success: false, error: error.response.data.message };
    }
}