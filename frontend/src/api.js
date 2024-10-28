import axios from 'axios'

const api = axios.create({
    baseURL: 'https://learning-deployment-backend.onrender.com/api'
})

export default api
