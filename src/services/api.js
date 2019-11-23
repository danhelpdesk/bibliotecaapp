import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.30.1.93:8080/'
});

export default api;