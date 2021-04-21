import axios from 'axios';


const api = axios.create({
    baseURL:"https://contadorapi.herokuapp.com"
    // baseURL:process.env.local.URL_LOCAL
    //baseURL:"http://localhost:4000"
})


export default api;