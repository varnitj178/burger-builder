import axios from 'axios'

const instance = axios.create({
    baseURL:'https://burger-4dc59-default-rtdb.firebaseio.com/'
})



export default instance;
