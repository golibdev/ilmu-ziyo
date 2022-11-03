import axios from 'axios';
import { baseUrl, headers } from '../constants'

export const authApi = {
   getMyData: () => axios.get(
      `${baseUrl}admin/get-my-data`,
      headers
   ),
   login: (params) => axios.post(
      `${baseUrl}admin/login`,
      params
   ),
   update: (params) => axios.put(
      `${baseUrl}admin/update`,
      params,
      headers
   )
} 