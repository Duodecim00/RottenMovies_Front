import axios from 'axios';

const ApiManager = axios.create({
    baseURL:"https://appnotesservermoviles-production.up.railway.app",
    responseType:'json',
    withCredentials: true
});

export default ApiManager;