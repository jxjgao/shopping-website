import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-deer-shop.herokuapp.com/'
});

export default instance;