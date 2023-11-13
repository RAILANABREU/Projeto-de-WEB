import axios from 'axios'

const baseURL = 'http://localhost:3000'

export function signup(data){
    delete data.senha2;
    const response = axios.post(`${baseURL}/user/register`, data);
    return response;
}

//import axios from 'axios';

//const baseURL = 'http://localhost:3000';

//export function signup(data) {
//  const formData = new FormData();

//  formData.append('nome', data.nome);
//  formData.append('sobrenome', data.sobrenome);
//  formData.append('telefone', data.telefone);
//  formData.append('senha', data.senha);
//  formData.append('avatar', data.avatar);
//  const response = axios.post(`${baseURL}/user/register`, formData, {
//    headers: {
//      'Content-Type': 'multipart/form-data',
//    },
//  });

//  return response;
//}