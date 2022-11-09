import axios from 'axios';
import { baseUrl, headers } from '../constants'

export const serviceApi = {
   getAll: () => axios.get(
      `${baseUrl}service`
   ),
   getOne: (id) => axios.get(
      `${baseUrl}service/${id}`
   ),
   create: (params) => axios.post(
      `${baseUrl}service`,
      params,
      headers
   ),
   update: (id, params) => axios.put(
      `${baseUrl}service/${id}`,
      params,
      headers
   )
} 