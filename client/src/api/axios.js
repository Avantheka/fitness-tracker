import axios from '../api/axios'; 
const instance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
});
 
export default instance;