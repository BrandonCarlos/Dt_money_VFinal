import axios from 'axios';//axios faz requisiçoes para API's externas

export const api = axios.create({
  // Abaixo vamos colocar o endereço que se repete em todas as requisições
  baseURL: 'http://localhost:3000/api'
})
