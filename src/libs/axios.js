import axios from 'axios';
import { serverUrl } from '../constants/serverUrl';

const api = axios.create({
    baseURL: serverUrl
})

export default api