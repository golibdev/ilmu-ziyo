import axios from 'axios';
import { baseUrl } from '../constants'

export const authApi = {
   login: (params) => axios.post(
      `${baseUrl}admin/login`,
      params
   )
} 