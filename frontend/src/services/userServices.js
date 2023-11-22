import axios from 'axios';

const baseURL = 'http://localhost:3000';

export async function signup(data) {
  try {
    delete data.senha2;
    const response = await axios.post(`${baseURL}/user/register`, data);
    return response;
  } catch (error) {
    console.error('Erro no cadastro:', error.message);
    throw error;
  }
}

export async function signin(data) {
  try {
    const response = await axios.post(`${baseURL}/login`, data);
    return response;
  } catch (error) {
    console.error('Erro no login:', error.message);
    throw error;
  }
}

export async function FindUserByID(id) {
  try {
    const response = await axios.get(`${baseURL}/user/findUserById/${id}`);
    const userFound = response.data.user;
    console.log('Usuário Encontrado:', userFound);
    return userFound;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error.message);
    throw error;
  }
}