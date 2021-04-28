import axios from 'axios';


const api = axios.create({
    baseURL:"https://contador2api.herokuapp.com"
    // baseURL:process.env.local.URL_LOCAL
    //baseURL:"http://localhost:4000"
})


export default api;