import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:9055'
});

export default instance;