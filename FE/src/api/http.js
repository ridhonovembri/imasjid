import axios from "axios"

export default axios.create({
  // baseURL: 'https://jsonplaceholder.typicode.com',
  baseURL: 'http://localhost:3001/api/',
  // baseURL: 'api/',
  headers: {
    'Content-type': 'application/json'
  }
});