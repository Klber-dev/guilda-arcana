import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/Public/index.php',
    withCredentials: true,
})

export default api;